function displayContent(response) {
        console.log("Content generated");
        new Typewriter("#content", {
            strings: response.data.answer,
            autoStart: true,
            delay: 50,
            cursor: "",
        });
    }

    function generateContent(event) {
        event.preventDefault();

        const instructionsInput = document.querySelector("#user-instructions").value;
        const contentType = document.querySelector("#content-type").value;
        const apiKey = "b2ftbed3f683eac832c6c0ec983o4a40";

        // Define prompts and contexts based on content type
        let prompt = `Generate a ${contentType} about ${instructionsInput}`;
        let context = "";

        switch (contentType) {
            case "accommodation":
                context = "You are an accommodation expert and you love peepole to stay in good places. Your mission is to generate nice accommodation places in basic HTML and separate each line with a <br>. Do NOT write the word 'HTML' at all on the poem page, just start generating the accommodation place itself without saying anything else. Sign the accommodation place saying Eugenia's AI accommodation places with a <strong> it should be italic. Make sure to follow the user instructions.";
                break;
            case "food and drinks":
                context = "You are a food and drink expert. Generate food and drink based on the topic provided. The food and drink should be in basic HTML, Dont add the word html at all in the food and drink.DO NOT write the word 'HTML' at all on the food and drink page, just start generating the poem itself without saying anything else";
                break;
            case "activities":
                context = "You are an activity expert. Generate activities based on the topic provided. Format it in basic HTML with clear instructions.Do NOT write the word 'HTML' at all on the activities page, just start generating the activities without saying anything else";
                break;
            case "cultures":
                context = "You are a culture expert. Generate different cultures based on the provided theme. Format it in basic HTML.Do NOT write the word 'HTML' at all on the culture page, just start generating cultures itself without saying anything else";
                break;
            case "travel":
                context = "You are a travel guide expert. Generate a travel destination description based on the provided location. Include interesting facts and tips in basic HTML.Do NOT write the word 'HTML' at all on the travel destination page, just start generating the travel destinations itself without saying anything else";
                break;
            case "travel-tips":
                context = "You are a travel tips expert. Generate travel tips based on the provided criteria or theme. Format the list in basic HTML.Do NOT write the word 'HTML' at all on the travel page, just start generating the poem itself without saying anything else";
                break;
             case "weather forecast":
                context = "You are a weather forecast expert. Generate weather forecast based on the provided theme. Format it in basic HTML.Do NOT write the word 'HTML' at all on the weather forecast page, just start generating weather forecast itself without saying anything else. please do not write weather forecast at the begging, just start by greetings";
            default:
                context = "Generate content based on the user's instructions.Do NOT write the word 'HTML' at all on the poem page, just start generating the poem itself without saying anything else";
        }

        let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

        let contentElement = document.querySelector("#content");
        contentElement.classList.remove("hidden");
        contentElement.innerHTML = `<div class="generating">⏳ Generating the ${contentType} for you...</div>`;

        console.log("Generating content");
        console.log(`Prompt: ${prompt}`);
        console.log(`Context: ${context}`);

        axios.get(apiUrl)
            .then(displayContent)
            .catch(error => {
                console.error("Error generating content:", error);
                contentElement.innerHTML = `<div class="error">❌ Failed to generate content. Please try again later.</div>`;
            });
    }

    let formElement = document.querySelector("#content-generator-form"); // Updated selector
    formElement.addEventListener("submit", generateContent);


