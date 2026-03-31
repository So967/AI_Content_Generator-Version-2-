const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = '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';

async function generateContent() {
    const title = document.getElementById('courseTitle').value.trim();
    const output = document.getElementById('outputArea');
    const loading = document.getElementById('loading');
    const copyBtn = document.getElementById('copyBtn');

    if (!title) {
        alert("Please enter a course title.");
        return;
    }

    // UI Updates
    loading.classList.remove('hidden');
    output.value = "";
    copyBtn.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "openai/gpt-3.5-turbo",
                "messages": [
                    { "role": "system", "content": "You are an educational expert. Generate a detailed syllabus with objectives and assessments." },
                    { "role": "user", "content": `Create a course outline for: ${title}` }
                ]
            })
        });

        const data = await response.json();
        const content = data.choices[0].message.content;

        output.value = content;
        copyBtn.disabled = false;
    } catch (error) {
        output.value = "Error: " + error.message;
    } finally {
        loading.classList.add('hidden');
    }
}

function copyContent() {
    const output = document.getElementById('outputArea');
    output.select();
    document.execCommand('copy');
    alert("Syllabus copied to clipboard!");
}