x <- c(1,2,3,4)
y <- c(157,
       81,
       52,
       45)
ymax <- max(y)
ymin <- min(y)
x2 <-x^2
quad <- seq(1, 4, 0.1)
quad2 <- quad^2



fit <- lm(y ~ x * x2)
plot(x, y, type = "l", col="blue", xlim = c(1, 4), ylim = c(min(ymin),max(ymax)),
     main = "Processing 60 workflows on 1 to 4 Raspberry Pis", xlab = "Raspberry Pi Cluster Size", ylab = "Overall processing time [m]"
    )
predictedcounts <- predict(fit,list(x=quad, x2=quad2))
lines(quad, predictedcounts, col = "red",
lwd = 1)
legend("topright", legend=c("quadratic estimate y = a*x2", "Data"),
       col=c("red", "blue"), lty = 1, cex=0.8)
summary(fit)