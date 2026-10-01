// ======================================================
// StudentPredict - Main JavaScript
// ======================================================


// ======================================================
// HELPER FUNCTIONS
// ======================================================

function getUser() {
    return JSON.parse(
        localStorage.getItem("studentPredictUser")
    );
}


function getLatestPrediction() {
    return JSON.parse(
        localStorage.getItem("latestPrediction")
    );
}


function getPredictionHistory() {
    return JSON.parse(
        localStorage.getItem("predictionHistory")
    ) || [];
}


function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


function showError(id, message) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = message;
    }
}


function hideError(id) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = "";
    }
}


// ======================================================
// LOGIN
// ======================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            hideError("loginError");

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;

            const savedUser = getUser();

            if (!savedUser) {

                showError(
                    "loginError",
                    "No account found. Please create an account first."
                );

                return;
            }


            if (
                email !== savedUser.email ||
                password !== savedUser.password
            ) {

                showError(
                    "loginError",
                    "Incorrect email or password."
                );

                return;
            }


            localStorage.setItem(
                "studentPredictLoggedIn",
                "true"
            );


            window.location.href =
                "dashboard.html";

        }
    );

}


// ======================================================
// REGISTER
// ======================================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            hideError("registerError");


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("registerPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            if (password.length < 6) {

                showError(
                    "registerError",
                    "Password must contain at least 6 characters."
                );

                return;
            }


            if (password !== confirmPassword) {

                showError(
                    "registerError",
                    "Passwords do not match."
                );

                return;
            }


            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "studentPredictUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "studentPredictLoggedIn",
                "true"
            );


            window.location.href =
                "dashboard.html";

        }
    );

}


// ======================================================
// DASHBOARD
// ======================================================

if (
    document.getElementById("welcomeName")
) {

    const user = getUser();

    const prediction =
        getLatestPrediction();


    if (user) {

        setText(
            "welcomeName",
            "Welcome, " + user.name + "!"
        );

    }


    if (prediction) {

        setText(
            "predictedScore",
            prediction.predictedScore
        );


        setText(
            "performanceLevel",
            prediction.performance
        );


        setText(
            "riskLevel",
            prediction.risk
        );

    }

}


// ======================================================
// PREDICTION FORM
// ======================================================

const predictionForm =
    document.getElementById("predictionForm");


if (predictionForm) {

    predictionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            hideError("predictionError");


            // ------------------------------------------
            // STUDENT DETAILS
            // ------------------------------------------

            const studentName =
                document
                    .getElementById("studentName")
                    .value
                    .trim();


            const rollNumber =
                document
                    .getElementById("rollNumber")
                    .value
                    .trim();


            const department =
                document
                    .getElementById("department")
                    .value;


            const year =
                document
                    .getElementById("year")
                    .value;


            const semester =
                document
                    .getElementById("semester")
                    .value;


            // ------------------------------------------
            // ACADEMIC DETAILS
            // ------------------------------------------

            const currentCGPA =
                parseFloat(
                    document
                        .getElementById("currentCGPA")
                        .value
                );


            const previousSGPA =
                parseFloat(
                    document
                        .getElementById("previousSGPA")
                        .value
                );


            const attendance =
                parseFloat(
                    document
                        .getElementById("attendance")
                        .value
                );


            const backlogs =
                parseInt(
                    document
                        .getElementById("backlogs")
                        .value
                );


            // ------------------------------------------
            // STUDY HABITS
            // ------------------------------------------

            const studyHours =
                parseFloat(
                    document
                        .getElementById("studyHours")
                        .value
                );


            const studySessions =
                parseInt(
                    document
                        .getElementById("studySessions")
                        .value
                );


            const sleepHours =
                parseFloat(
                    document
                        .getElementById("sleepHours")
                        .value
                );


            // ------------------------------------------
            // VALIDATION
            // ------------------------------------------

            if (
                currentCGPA < 0 ||
                currentCGPA > 10
            ) {

                showError(
                    "predictionError",
                    "Current CGPA must be between 0 and 10."
                );

                return;
            }


            if (
                previousSGPA < 0 ||
                previousSGPA > 10
            ) {

                showError(
                    "predictionError",
                    "Previous SGPA must be between 0 and 10."
                );

                return;
            }


            if (
                attendance < 0 ||
                attendance > 100
            ) {

                showError(
                    "predictionError",
                    "Attendance must be between 0 and 100."
                );

                return;
            }


            if (backlogs < 0) {

                showError(
                    "predictionError",
                    "Backlogs cannot be negative."
                );

                return;
            }


            if (
                studyHours < 0 ||
                studyHours > 24
            ) {

                showError(
                    "predictionError",
                    "Study hours must be between 0 and 24."
                );

                return;
            }


            if (
                studySessions < 0 ||
                studySessions > 50
            ) {

                showError(
                    "predictionError",
                    "Study sessions must be between 0 and 50."
                );

                return;
            }


            if (
                sleepHours < 0 ||
                sleepHours > 24
            ) {

                showError(
                    "predictionError",
                    "Sleep hours must be between 0 and 24."
                );

                return;
            }


            // ==================================================
            // PERFORMANCE CALCULATION
            // ==================================================

            const cgpaPercentage =
                currentCGPA * 10;


            const sgpaPercentage =
                previousSGPA * 10;


            // Study hours score
            let studyHourScore =
                (studyHours / 8) * 100;


            if (studyHourScore > 100) {

                studyHourScore = 100;

            }


            // Study sessions score
            let studySessionScore =
                (studySessions / 7) * 100;


            if (studySessionScore > 100) {

                studySessionScore = 100;

            }


            // Sleep score
            let sleepScore;


            if (
                sleepHours >= 7 &&
                sleepHours <= 8
            ) {

                sleepScore = 100;

            }
            else if (
                sleepHours >= 6 &&
                sleepHours < 7
            ) {

                sleepScore = 85;

            }
            else if (
                sleepHours > 8 &&
                sleepHours <= 9
            ) {

                sleepScore = 85;

            }
            else if (sleepHours >= 5) {

                sleepScore = 70;

            }
            else {

                sleepScore = 50;

            }


            // ------------------------------------------
            // FINAL SCORE
            // ------------------------------------------

            let predictedScore =

                (cgpaPercentage * 0.35) +

                (sgpaPercentage * 0.25) +

                (attendance * 0.15) +

                (studyHourScore * 0.10) +

                (studySessionScore * 0.05) +

                (sleepScore * 0.10);


            // Backlog penalty
            predictedScore =
                predictedScore -
                (backlogs * 5);


            // Keep score between 0 and 100
            if (predictedScore < 0) {

                predictedScore = 0;

            }


            if (predictedScore > 100) {

                predictedScore = 100;

            }


            predictedScore =
                Math.round(
                    predictedScore * 10
                ) / 10;


            // ==================================================
            // PERFORMANCE LEVEL
            // ==================================================

            let performance;


            if (predictedScore >= 85) {

                performance = "Excellent";

            }
            else if (predictedScore >= 70) {

                performance = "Good";

            }
            else if (predictedScore >= 50) {

                performance = "Average";

            }
            else {

                performance = "At Risk";

            }


            // ==================================================
            // ACADEMIC RISK
            // ==================================================

            let risk;


            if (
                predictedScore < 50 ||
                attendance < 60 ||
                backlogs >= 3
            ) {

                risk = "High";

            }
            else if (
                predictedScore < 70 ||
                attendance < 75 ||
                backlogs > 0
            ) {

                risk = "Medium";

            }
            else {

                risk = "Low";

            }


            // ==================================================
            // CREATE PREDICTION OBJECT
            // ==================================================

            const prediction = {

                studentName:
                    studentName,

                rollNumber:
                    rollNumber,

                department:
                    department,

                year:
                    year,

                semester:
                    semester,

                currentCGPA:
                    currentCGPA,

                previousSGPA:
                    previousSGPA,

                attendance:
                    attendance,

                backlogs:
                    backlogs,

                studyHours:
                    studyHours,

                studySessions:
                    studySessions,

                sleepHours:
                    sleepHours,

                predictedScore:
                    predictedScore,

                performance:
                    performance,

                risk:
                    risk,

                date:
                    new Date()
                        .toLocaleDateString(),

                time:
                    new Date()
                        .toLocaleTimeString()

            };


            // ==================================================
            // SAVE LATEST PREDICTION
            // ==================================================

            localStorage.setItem(
                "latestPrediction",
                JSON.stringify(prediction)
            );


            // ==================================================
            // SAVE HISTORY
            // ==================================================

            let history =
                getPredictionHistory();


            history.unshift(
                prediction
            );


            localStorage.setItem(
                "predictionHistory",
                JSON.stringify(history)
            );


            // ==================================================
            // OPEN RESULT PAGE
            // ==================================================

            window.location.href =
                "result.html";

        }
    );

}


// ======================================================
// RESULT PAGE
// ======================================================

if (
    document.getElementById("resultScore")
) {

    const prediction =
        getLatestPrediction();


    if (prediction) {

        // ----------------------------------------------
        // Main result
        // ----------------------------------------------

        setText(
            "resultScore",
            prediction.predictedScore
        );


        setText(
            "resultName",
            prediction.studentName
        );


        setText(
            "performanceBadge",
            prediction.performance
        );


        // ----------------------------------------------
        // Student details
        // ----------------------------------------------

        setText(
            "resultRoll",
            prediction.rollNumber
        );


        setText(
            "resultDepartment",
            prediction.department
        );


        setText(
            "resultYear",
            prediction.year + " Year"
        );


        setText(
            "resultSemester",
            "Semester " +
            prediction.semester
        );


        // ----------------------------------------------
        // Risk
        // ----------------------------------------------

        setText(
            "resultRisk",
            prediction.risk
        );


        let riskDescription =
            "";


        if (
            prediction.risk === "Low"
        ) {

            riskDescription =
                "Your current academic indicators show lower academic risk.";

        }
        else if (
            prediction.risk === "Medium"
        ) {

            riskDescription =
                "Some academic indicators may need attention.";

        }
        else {

            riskDescription =
                "Several academic indicators require attention.";

        }


        setText(
            "riskDescription",
            riskDescription
        );


        // ----------------------------------------------
        // Academic factors
        // ----------------------------------------------

        setText(
            "factorCGPA",
            prediction.currentCGPA
        );


        setText(
            "factorSGPA",
            prediction.previousSGPA
        );


        setText(
            "factorAttendance",
            prediction.attendance + "%"
        );


        setText(
            "resultBacklogs",
            prediction.backlogs
        );


        setText(
            "resultCGPA",
            prediction.currentCGPA
        );


        // ----------------------------------------------
        // Progress bars
        // ----------------------------------------------

        setResultFactor(
            "factorCGPA",
            "cgpaProgress",
            prediction.currentCGPA * 10
        );


        setResultFactor(
            "factorSGPA",
            "sgpaProgress",
            prediction.previousSGPA * 10
        );


        setResultFactor(
            "factorAttendance",
            "attendanceProgress",
            prediction.attendance
        );


        // ----------------------------------------------
        // Study habits
        // ----------------------------------------------

        setText(
            "resultStudyHours",
            prediction.studyHours
        );


        setText(
            "resultSessions",
            prediction.studySessions
        );


        setText(
            "resultSleep",
            prediction.sleepHours
        );


        // ----------------------------------------------
        // Recommendations
        // ----------------------------------------------

        generateRecommendations(
            prediction
        );

    }

}


// ======================================================
// RESULT PROGRESS BAR FUNCTION
// ======================================================

function setResultFactor(
    textId,
    progressId,
    percentage
) {

    const textElement =
        document.getElementById(textId);


    const progressElement =
        document.getElementById(progressId);


    if (textElement) {

        // Do not overwrite the original formatted text
        // if it was already set.

    }


    if (progressElement) {

        let value =
            percentage;


        if (value < 0) {

            value = 0;

        }


        if (value > 100) {

            value = 100;

        }


        progressElement.style.width =
            value + "%";

    }

}


// ======================================================
// RECOMMENDATIONS
// ======================================================

function generateRecommendations(
    prediction
) {

    const list =
        document.getElementById(
            "recommendationList"
        );


    if (!list) {

        return;

    }


    list.innerHTML = "";


    const recommendations = [];


    // CGPA
    if (
        prediction.currentCGPA < 6
    ) {

        recommendations.push(
            "Focus on improving your current CGPA through regular revision and subject-wise preparation."
        );

    }
    else if (
        prediction.currentCGPA < 8
    ) {

        recommendations.push(
            "Maintain consistent study habits to gradually improve your CGPA."
        );

    }
    else {

        recommendations.push(
            "Your current CGPA is strong. Continue maintaining your academic consistency."
        );

    }


    // Attendance
    if (
        prediction.attendance < 75
    ) {

        recommendations.push(
            "Try to improve your class attendance and avoid unnecessary absences."
        );

    }
    else {

        recommendations.push(
            "Your attendance is at a reasonable level. Continue attending classes regularly."
        );

    }


    // Backlogs
    if (
        prediction.backlogs > 0
    ) {

        recommendations.push(
            "Give priority to clearing your backlog subjects along with your current semester subjects."
        );

    }
    else {

        recommendations.push(
            "You currently have no backlogs. Continue keeping up with your subjects."
        );

    }


    // Study hours
    if (
        prediction.studyHours < 2
    ) {

        recommendations.push(
            "Consider increasing your daily study time gradually."
        );

    }
    else {

        recommendations.push(
            "Maintain a consistent daily study routine."
        );

    }


    // Sleep
    if (
        prediction.sleepHours < 6
    ) {

        recommendations.push(
            "Try to maintain sufficient sleep because regular rest can support concentration and learning."
        );

    }
    else if (
        prediction.sleepHours > 9
    ) {

        recommendations.push(
            "Maintain a balanced sleep schedule and use your remaining time effectively for academic activities."
        );

    }
    else {

        recommendations.push(
            "Your reported sleep duration is within a commonly recommended range for students."
        );

    }


    recommendations.forEach(
        function (recommendation) {

            const li =
                document.createElement(
                    "li"
                );


            li.textContent =
                recommendation;


            list.appendChild(
                li
            );

        }
    );

}


// ======================================================
// ANALYTICS PAGE
// ======================================================

if (
    document.getElementById(
        "analyticsScore"
    )
) {

    const prediction =
        getLatestPrediction();


    if (prediction) {

        // ----------------------------------------------
        // Overall performance
        // ----------------------------------------------

        setText(
            "analyticsScore",
            prediction.predictedScore
        );


        setText(
            "analyticsPerformance",
            prediction.performance
        );


        setText(
            "analyticsRisk",
            prediction.risk
        );


        // ----------------------------------------------
        // Academic factors
        // ----------------------------------------------

        setText(
            "analyticsCGPA",
            prediction.currentCGPA
        );


        setText(
            "analyticsSGPA",
            prediction.previousSGPA
        );


        setText(
            "analyticsAttendance",
            prediction.attendance + "%"
        );


        setText(
            "analyticsBacklogs",
            prediction.backlogs
        );


        // ----------------------------------------------
        // Study habits
        // ----------------------------------------------

        setText(
            "analyticsStudyHours",
            prediction.studyHours
        );


        setText(
            "analyticsSessions",
            prediction.studySessions
        );


        setText(
            "analyticsSleep",
            prediction.sleepHours
        );


        setText(
            "analyticsHabitCGPA",
            prediction.currentCGPA
        );


        // ----------------------------------------------
        // Progress bars
        // ----------------------------------------------

        setAnalyticsBar(
            "analyticsCGPABar",
            prediction.currentCGPA * 10
        );


        setAnalyticsBar(
            "analyticsSGPABar",
            prediction.previousSGPA * 10
        );


        setAnalyticsBar(
            "analyticsAttendanceBar",
            prediction.attendance
        );


        // ----------------------------------------------
        // Insights
        // ----------------------------------------------

        generateAnalyticsInsights(
            prediction
        );

    }

}


// ======================================================
// ANALYTICS PROGRESS BAR
// ======================================================

function setAnalyticsBar(
    id,
    percentage
) {

    const element =
        document.getElementById(id);


    if (!element) {

        return;

    }


    let value =
        percentage;


    if (value < 0) {

        value = 0;

    }


    if (value > 100) {

        value = 100;

    }


    element.style.width =
        value + "%";

}


// ======================================================
// ANALYTICS INSIGHTS
// ======================================================

function generateAnalyticsInsights(
    prediction
) {

    const container =
        document.getElementById(
            "analyticsInsights"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const insights = [];


    // CGPA insight
    if (
        prediction.currentCGPA >= 8
    ) {

        insights.push(
            "Your current CGPA indicates a relatively strong academic record."
        );

    }
    else if (
        prediction.currentCGPA >= 6
    ) {

        insights.push(
            "Your current CGPA provides a base that can be improved with consistent preparation."
        );

    }
    else {

        insights.push(
            "Your current CGPA suggests that additional academic focus may be useful."
        );

    }


    // Attendance insight
    if (
        prediction.attendance < 75
    ) {

        insights.push(
            "Attendance is below 75%, so attending classes more consistently may be useful."
        );

    }
    else {

        insights.push(
            "Your attendance is 75% or above."
        );

    }


    // Backlog insight
    if (
        prediction.backlogs > 0
    ) {

        insights.push(
            "You have " +
            prediction.backlogs +
            " current backlog subject(s) to work on."
        );

    }
    else {

        insights.push(
            "You currently have no backlogs."
        );

    }


    // Study hours
    if (
        prediction.studyHours < 2
    ) {

        insights.push(
            "Your reported daily study time is relatively low."
        );

    }
    else {

        insights.push(
            "You report studying regularly each day."
        );

    }


    insights.forEach(
        function (insight) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "analytics-insight";


            div.innerHTML =
                `
                <span>💡</span>
                <p>${insight}</p>
                `;


            container.appendChild(
                div
            );

        }
    );

}


// ======================================================
// HISTORY PAGE
// ======================================================

if (
    document.getElementById(
        "historyList"
    )
) {

    renderHistory();

}


// ======================================================
// RENDER HISTORY
// ======================================================

function renderHistory() {

    const history =
        getPredictionHistory();


    const historyList =
        document.getElementById(
            "historyList"
        );


    const emptyHistory =
        document.getElementById(
            "emptyHistory"
        );


    const totalPredictions =
        document.getElementById(
            "totalPredictions"
        );


    const latestHistoryScore =
        document.getElementById(
            "latestHistoryScore"
        );


    if (!historyList) {

        return;

    }


    historyList.innerHTML = "";


    // ----------------------------------------------
    // Total count
    // ----------------------------------------------

    if (totalPredictions) {

        totalPredictions.textContent =
            history.length;

    }


    // ----------------------------------------------
    // Empty history
    // ----------------------------------------------

    if (history.length === 0) {

        if (emptyHistory) {

            emptyHistory.style.display =
                "block";

        }


        if (latestHistoryScore) {

            latestHistoryScore.textContent =
                "--";

        }


        return;

    }


    if (emptyHistory) {

        emptyHistory.style.display =
            "none";

    }


    // ----------------------------------------------
    // Latest score
    // ----------------------------------------------

    if (latestHistoryScore) {

        latestHistoryScore.textContent =
            history[0].predictedScore;

    }


    // ----------------------------------------------
    // History cards
    // ----------------------------------------------

    history.forEach(
        function (prediction, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "history-card";


            card.innerHTML =

                `
                <div class="history-card-top">

                    <div>

                        <h3>
                            ${prediction.studentName}
                        </h3>

                        <p>
                            ${prediction.date}
                            •
                            ${prediction.time}
                        </p>

                    </div>

                    <div class="history-score">

                        <strong>
                            ${prediction.predictedScore}
                        </strong>

                        <small>
                            /100
                        </small>

                    </div>

                </div>


                <div class="history-status-row">

                    <span class="history-performance">
                        ${prediction.performance}
                    </span>

                    <span class="history-risk">
                        ${prediction.risk} Risk
                    </span>

                </div>


                <div class="history-details">

                    <div>
                        <span>CGPA</span>
                        <strong>
                            ${prediction.currentCGPA}
                        </strong>
                    </div>

                    <div>
                        <span>SGPA</span>
                        <strong>
                            ${prediction.previousSGPA}
                        </strong>
                    </div>

                    <div>
                        <span>Attendance</span>
                        <strong>
                            ${prediction.attendance}%
                        </strong>
                    </div>

                    <div>
                        <span>Backlogs</span>
                        <strong>
                            ${prediction.backlogs}
                        </strong>
                    </div>

                </div>


                <div class="history-study-details">

                    <span>
                        📖 ${prediction.studyHours} hrs/day
                    </span>

                    <span>
                        📚 ${prediction.studySessions} sessions/week
                    </span>

                    <span>
                        😴 ${prediction.sleepHours} hrs sleep
                    </span>

                </div>
                `;


            historyList.appendChild(
                card
            );

        }
    );

}


// ======================================================
// CLEAR HISTORY
// ======================================================

const clearHistoryButton =
    document.getElementById(
        "clearHistoryButton"
    );


if (clearHistoryButton) {

    clearHistoryButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "predictionHistory"
            );


            localStorage.removeItem(
                "latestPrediction"
            );


            renderHistory();

        }
    );

}


// ======================================================
// PROFILE PAGE
// ======================================================

if (
    document.getElementById(
        "profileName"
    )
) {

    const user =
        getUser();


    const prediction =
        getLatestPrediction();


    const history =
        getPredictionHistory();


    // ----------------------------------------------
    // Account information
    // ----------------------------------------------

    if (user) {

        setText(
            "profileName",
            user.name
        );


        setText(
            "profileEmail",
            user.email
        );


        setText(
            "profileFullName",
            user.name
        );


        setText(
            "profileEmailDetails",
            user.email
        );

    }


    // ----------------------------------------------
    // Prediction information
    // ----------------------------------------------

    if (prediction) {

        setText(
            "profileDepartment",
            prediction.department
        );


        setText(
            "profileYear",
            prediction.year + " Year"
        );


        // Academic information

        setText(
            "profileCGPA",
            prediction.currentCGPA
        );


        setText(
            "profileSGPA",
            prediction.previousSGPA
        );


        setText(
            "profileAttendance",
            prediction.attendance + "%"
        );


        setText(
            "profileBacklogs",
            prediction.backlogs
        );


        // Prediction summary

        setText(
            "profilePredictions",
            history.length
        );


        setText(
            "profileLatestScore",
            prediction.predictedScore
        );


        setText(
            "profilePerformance",
            prediction.performance
        );


        setText(
            "profileRisk",
            prediction.risk
        );

    }
    else {

        setText(
            "profilePredictions",
            history.length
        );

    }

}


// ======================================================
// LOGOUT
// ======================================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "studentPredictLoggedIn"
            );


            window.location.href =
                "index.html";

        }
    );

}