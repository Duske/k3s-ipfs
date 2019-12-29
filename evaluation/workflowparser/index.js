const jsonFilePath = process.argv[2];
const jsonFile = require(jsonFilePath);

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    header: [
        { id: 'filename', title: 'filename'},
        { id: 'start', title: 'start'},
        { id: 'end', title: 'end'},
        { id: 'duration',title: 'duration'},
        { id: 'time_extract-data', title: 'time_extract-data'},
        { id: 'time_core-phrases', title: 'time_core-phrases'},
        { id: 'time_keywords',title: 'time_keywords'},
        { id: 'time_stats',title: 'time_stats'},
        { id: 'time_guess-language',title: 'time_guess-language'},
        { id: 'time_merger',title: 'time_merger'}
    ],
    path: 'results.csv'
});

const workflows = jsonFile.items;

const getEarliestStartdate = (workflows) => {
    const earliestDate = workflows.reduce((accDate, workflowItem) => {
        const newDate = new Date(workflowItem.status.startedAt);
        if (newDate.getTime() < accDate.getTime()) {
            return newDate;
        }
        return accDate;
    }, new Date(workflows[0].status.startedAt))
    return earliestDate; 
}

const getOldestEnddate = (workflows) => {
    const oldestDate = workflows.reduce((accDate, workflowItem) => {
        const newDate = new Date(workflowItem.status.finishedAt);
        if (newDate.getTime() > accDate.getTime()) {
            return newDate;
        }
        return accDate;
    }, new Date(workflows[0].status.finishedAt))
    return oldestDate; 
}

const diffInMinutes = (date2, date1) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 )); 
    return diffDays;
}

const diffInSeconds = (date2, date1) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 )); 
    return diffDays;
}

const startDate = getEarliestStartdate(workflows);
const endDate = getOldestEnddate(workflows);
console.log(
    startDate,
    endDate,
    diffInMinutes(endDate, startDate) + " minutes"
)

const writeRecords = async (records) => {
    return csvWriter.writeRecords(records)
    .then(() => {
        console.log('...Done');
    });
}

const analyzeWorkflow = workflows => {
    return workflows.map(workflow => {
        const startDate = new Date(workflow.status.startedAt);
        const endDate = new Date(workflow.status.finishedAt);
        const duration = diffInSeconds(endDate, startDate);
        const filename = workflow.spec.arguments.parameters[0].value;
        const tasks = Object.values(workflow.status.nodes).reduce((map, task) => {
            const name = task.displayName;
            if(task.displayName.startsWith('text-analysis')) {
                return map;
            }
            const startDate = new Date(task.startedAt);
            const endDate = new Date(task.finishedAt);
            const duration = diffInSeconds(endDate, startDate)
            return {
                ...map,
                ['time_'+name]: duration
            }
        }, {
            'time_extract-data': undefined, 
            'time_core-phrases': undefined, 
            'time_keywords': undefined,
            'time_stats': undefined,
            'time_guess-language': undefined,
            'time_merger': undefined,
        })
        return {
            filename,
            start: startDate.getTime() / 1000,
            end: endDate.getTime() / 1000,
            duration,
            ...tasks
        }
    });
}

const boot = async () => {
    const records = analyzeWorkflow(workflows);
    await writeRecords(records);
}

boot().then(() => console.log("success")).then(err => console.log(err));