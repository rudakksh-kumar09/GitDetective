document.addEventListener("DOMContentLoaded", () => {
    const searchbar = document.querySelector("#search-bar");
    const profilecontainer = document.querySelector(".Profile-content");
    const root = document.documentElement.style;
    const url = "https://api.github.com/users/";
    const noresult = document.getElementById("error"); // Ensure this ID matches your HTML
    const modetext = document.getElementById("Mode-text");
    const modebtn = document.getElementById("Mode-btn");
    const modeicon = document.getElementById("mode-iconn"); // Fixed ID reference
    const Submit = document.getElementById("submit");
    const input = document.getElementById("search-bar");
    const user = document.getElementById("NameLink");
    const avtar = document.getElementById("avtar");
    const date = document.getElementById("Date");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const namee = document.getElementById("Name");
    const bio = document.getElementById("Bio");
    const repo = document.getElementById("Repos");
    const followerss = document.getElementById("Followers");
    const followingg = document.getElementById("Following");
    const user_location = document.getElementById("Loaction"); // Fixed "Location" typo
    const github = document.getElementById("GitHubLink");
    const twitter = document.getElementById("Twitter");
    const company = document.getElementById("Company");
    let darkMode = false;

    // Check if noresult exists
    if (!noresult) {
        console.error("Element with ID 'Error' not found in the DOM.");
    }

    Submit.addEventListener("click", function () {
        if (input.value !== "") {
            getUserData(url + input.value);
        } else {
            alert("Enter some input to search");
        }
    });

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && input.value !== "") {
            getUserData(url + input.value);
        }
    });

    input.addEventListener("input", function () {
        if (noresult) noresult.style.display = "none";
    });

    modebtn.addEventListener("click", function () {
        if (darkMode === false) {
            darkModeProperties();
        } else {
            lightModeProperties();
        }
    });

    // API CALL
    function getUserData(gitUrl) {
        fetch(gitUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                updateProfile(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                if (noresult) noresult.style.display = "block";
            });
    }

    // RENDER
    function updateProfile(data) {
        if (data.message !== "Not Found") {
            if (noresult) noresult.style.display = "none";
            function checkNull(param1, param2) {
                if (param1 === "" || param1 === null) {
                    param2.style.opacity = 0.5;
                    param2.previousElementSibling.style.opacity = 0.5;
                    return false;
                } else {
                    return true;
                }
            }
            avtar.src = data.avatar_url;
            namee.innerText = data.name === null ? data.login : data.name;
            user.innerText = `@${data.login}`;
            user.href = data.html_url;
            const datesegments = data.created_at.split("T")[0].split("-");
            date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
            bio.innerText = data.bio === null ? "This profile has no bio" : data.bio;
            repo.innerText = data.public_repos;
            followerss.innerText = data.followers;
            followingg.innerText = data.following;
            user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
            github.innerText = checkNull(data.blog, github) ? data.blog : "Not Available";
            github.href = checkNull(data.blog, github) ? data.blog : "#";
            twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
            twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
            company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
            searchbar.classList.toggle("active");
            profilecontainer.classList.toggle("active");
        } else {
            if (noresult) noresult.style.display = "block";
        }
    }

    function darkModeProperties() {
        root.setProperty("--lm-bg", "#141D2F");
        root.setProperty("--lm-bg-content", "#1E2A47");
        root.setProperty("--lm-text", "white");
        root.setProperty("--lm-text-alt", "white");
        root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
        modetext.innerText = "LIGHT";
        modeicon.src = "./assets/Images/sun-icon.svg"; // Ensure path is correct
        darkMode = true;
        localStorage.setItem("dark-mode", "true");
    }

    function lightModeProperties() {
        root.setProperty("--lm-bg", "#F6F8FF");
        root.setProperty("--lm-bg-content", "#FEFEFE");
        root.setProperty("--lm-text", "#4B6A9B");
        root.setProperty("--lm-text-alt", "#2B3442");
        root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
        modetext.innerText = "DARK";
        modeicon.src = "./assets/Images/moon-icon.svg"; // Ensure path is correct
        darkMode = false;
        localStorage.setItem("dark-mode", "false");
    }

    function init() {
        const value = localStorage.getItem("dark-mode");
        if (value === "true") {
            darkModeProperties();
        } else {
            lightModeProperties();
        }
        getUserData(url + "rudakksh-kumar09");
    }

    init();
});
