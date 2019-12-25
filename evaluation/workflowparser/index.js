const jsonFilePath = process.argv[2];
const jsonFile = require(jsonFilePath);

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

const startDate = getEarliestStartdate(workflows);
const endDate = getOldestEnddate(workflows);
console.log(
    startDate,
    endDate,
    diffInMinutes(endDate, startDate)
)