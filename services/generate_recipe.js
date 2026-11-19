const { GoogleGenAI, Type } = require('@google/genai');

const genAI = new GoogleGenAI({})

async function generateRecipe(ingredients) {
    const prompt = `Suggest one recipe that uses these ingredients. Ingredients: ${ingredients}`;

    const response = await genAI.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
        config: {
            systemInstruction: 'You are a recipe suggestion bot for a health-conscious, budget-friendly audience. You will suggest one recipe that uses the ingredients provided by the user. The recipe should be easy to make, healthy, and budget-friendly.',
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recipeName: { type: Type.STRING },
                    description: { type: Type.STRING },
                    ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                    instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['recipeName', 'description', 'ingredients', 'instructions'],
            },
        },
    });

    console.log(response.text);
    const recipe = JSON.parse(response.text);
    console.log(recipe);
    return recipe;
}

module.exports = generateRecipe;
