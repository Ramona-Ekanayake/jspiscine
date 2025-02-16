// Fetch JSON data from the local JSON file
fetch('piscine-js.json')
    .then(response => response.json())  // Parse the JSON data from the response
    .then(data => {
        console.log("Fetched data: ", data); // Add this line to log the fetched data
        // Call the function to populate the page with the fetched data
        populateQuestList(data);
    })
    .catch(error => {
        console.error("Error fetching JSON data: ", error);
    });

// Function to populate the Quest list dynamically
function populateQuestList(data) {
    const questList = document.getElementById('Quest-list');

    // Loop through each topic in the JSON data
    for (const topicKey in data.children) {
        if (data.children.hasOwnProperty(topicKey) && !['crossword', 'sortable', 'clonernews'].includes(topicKey)) {
            const topic = data.children[topicKey];

            // Create a new div element for each topic
            const topicElement = document.createElement('div');
            topicElement.classList.add('topic');

            // Create a button for the dropdown
            const dropdownButton = document.createElement('button');
            dropdownButton.classList.add('dropdown-btn');
            dropdownButton.innerHTML = `${topic.name} <span class="topic-details">(Type: ${topic.type}, Duration: ${topic.attrs.duration} days, Week: ${topic.attrs.week})</span>`;
            dropdownButton.addEventListener('click', () => {
                console.log(`Toggling dropdown for ${topic.name}`); // Debugging line
                dropdownButton.nextElementSibling.classList.toggle('show');
            });

            // Create a div for the dropdown content
            const dropdownContent = document.createElement('div');
            dropdownContent.classList.add('dropdown-content');

            // Loop through each exercise in the topic
            for (const exerciseKey in topic.children) {
                if (topic.children.hasOwnProperty(exerciseKey)) {
                    const exercise = topic.children[exerciseKey];

                    // Create a new div element for each exercise
                    const exerciseElement = document.createElement('div');
                    exerciseElement.classList.add('exercise');

                    // Populate the exercise details
                    exerciseElement.innerHTML = `
                        <h2>${exercise.name}</h2>
                        <p><strong>Expected Files:</strong> ${exercise.attrs.expectedFiles ? exercise.attrs.expectedFiles.join(', ') : 'N/A'}</p>
                        <p><strong>Exercise Type:</strong> ${exercise.attrs.exerciseType}</p>
                        <p><strong>Subject:</strong> ${exercise.attrs.subject ? `<a href="https://github.com/01-edu/public/tree/master${exercise.attrs.subject.replace('/markdown/root/public', '')}" target="_blank">https://github.com/01-edu/public/tree/master${exercise.attrs.subject.replace('/markdown/root/public', '')}</a>` : 'N/A'}</p>
                        ${exercise.attrs.groupSize ? `<p><strong>Group Size:</strong> ${exercise.attrs.groupSize}</p>` : ''}
                        ${exercise.attrs.auditsRequired ? `<p><strong>Audits Required:</strong> ${exercise.attrs.auditsRequired}</p>` : ''}
                        ${exercise.attrs.audit ? `<p><strong>Audit Link:</strong> <a href="${exercise.attrs.audit}" target="_blank">${exercise.attrs.audit}</a></p>` : ''}
                    `;

                    // Append the new exercise element to the dropdown content
                    dropdownContent.appendChild(exerciseElement);
                }
            }

            // Append the button and dropdown content to the topic element
            topicElement.appendChild(dropdownButton);
            topicElement.appendChild(dropdownContent);

            // Append the new topic element to the Quest list
            questList.appendChild(topicElement);
        }
    }

    // Handle "crossword", "sortable", and "clonernews" separately
    const specialTopics = ['crossword', 'sortable', 'clonernews'];
    specialTopics.forEach(topicKey => {
        if (data.children.hasOwnProperty(topicKey)) {
            const topic = data.children[topicKey];

            // Create a new div element for each special topic
            const topicElement = document.createElement('div');
            topicElement.classList.add('topic', 'special-topic');

            // Create a button for the dropdown
            const dropdownButton = document.createElement('button');
            dropdownButton.classList.add('dropdown-btn');
            dropdownButton.innerHTML = `${topic.name} <span class="topic-details">(Type: ${topic.type}, Duration: ${topic.attrs.duration} days, Week: ${topic.attrs.week})</span>`;
            dropdownButton.addEventListener('click', () => {
                console.log(`Toggling dropdown for ${topic.name}`); // Debugging line
                dropdownButton.nextElementSibling.classList.toggle('show');
            });

            // Create a div for the dropdown content
            const dropdownContent = document.createElement('div');
            dropdownContent.classList.add('dropdown-content');

            // Populate the special topic details
            const exerciseElement = document.createElement('div');
            exerciseElement.classList.add('exercise');

            // Populate the exercise details
            exerciseElement.innerHTML = `
                <h2>${topic.name}</h2>
                <p><strong>Expected Files:</strong> ${topic.attrs.expectedFiles ? topic.attrs.expectedFiles.join(', ') : 'N/A'}</p>
                <p><strong>Exercise Type:</strong> ${topic.attrs.exerciseType}</p>
                <p><strong>Subject:</strong> ${topic.attrs.subject ? `<a href="https://github.com/01-edu/public/tree/master${topic.attrs.subject.replace('/markdown/root/public', '')}" target="_blank">https://github.com/01-edu/public/tree/master${topic.attrs.subject.replace('/markdown/root/public', '')}</a>` : 'N/A'}</p>
                ${topic.attrs.groupSize ? `<p><strong>Group Size:</strong> ${topic.attrs.groupSize}</p>` : ''}
                ${topic.attrs.auditsRequired ? `<p><strong>Audits Required:</strong> ${topic.attrs.auditsRequired}</p>` : ''}
                ${topic.attrs.audit ? `<p><strong>Audit Link:</strong> <a href="${topic.attrs.audit}" target="_blank">${topic.attrs.audit}</a></p>` : ''}
            `;

            // Append the new exercise element to the dropdown content
            dropdownContent.appendChild(exerciseElement);

            // Append the button and dropdown content to the topic element
            topicElement.appendChild(dropdownButton);
            topicElement.appendChild(dropdownContent);

            // Append the new topic element to the Quest list
            questList.appendChild(topicElement);
        }
    });
}
