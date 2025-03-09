/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

//setBalance 
exports.setBalance = onRequest(async (request, response) => {
  const { userId, balance } = request.body;

  if (!userId || balance === undefined) {
    return response.status(400).send("Both User ID and balance are required.");
  }

  try {
    //Save balance to Firestore DataBase
    await db.collection("users").doc(userId).set({
      balance: balance,
    }, { merge: true });

    logger.info(`Balance set for user ${userId}: ${balance}`);
    response.status(200).send(`Balance for user ${userId} set to ${balance}`);
  } catch (error) {
    logger.error("Error setting balance", error);
    response.status(500).send("Error setting balance.");
  }
});

//setGoal, sets goal
exports.setGoal = onRequest(async (request, response) => {
  const { userId, goal } = request.body;

  if (!userId || !goal) {
    return response.status(400).send("User ID and goal are required.");
  }

  try {
    //Save goal to Firestore DataBase
    await db.collection("users").doc(userId).set({
      goal: goal,
    }, { merge: true });

    logger.info(`Goal set for user ${userId}: ${goal}`);
    response.status(200).send(`Goal for user ${userId} set to ${goal}`);
  } catch (error) {
    logger.error("Error setting goal", error);
    response.status(500).send("Error setting goal.");
  }
});

//advice, get AI Advice
exports.advice = onRequest(async (request, response) => {
  const { userId } = request.query;

  if (!userId) {
    return response.status(400).send("User ID is required.");
  }

  try {
    //Get user data
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return response.status(404).send("User not found.");
    }

    const userData = userDoc.data();
    const balance = userData.balance || 0;
    const goal = userData.goal;

    if (!goal) {
      return response.status(400).send("Goal is not set for this user.");
    }

    //Call ChatGPT for advice
    let aiAdvice = await getChatGPTAdvice(balance, goal);

    //Advice is returned
    logger.info(`ChatGPT Advice for user ${userId}: ${aiAdvice}`);
    response.status(200).send(aiAdvice);
  } catch (error) {
    logger.error("Error providing advice", error);
    response.status(500).send("Error providing advice.");
  }
});

//ChatGPT Advice
async function getChatGPTAdvice(balance, goal) {
  try {
    //ChatGPT call
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-4.5-turbo',
      prompt: `I have a balance of $${balance} and my goal is $${goal}. Can you give me personalized advice to help me reach my goal?`,
      max_tokens: 100
    }, {
      headers: {
        //'Authorization': ``, //API-Key
        'Content-Type': 'application/json'
      }
    });

    //Return the AI response
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    return "Advice currently can't be generated";
  }
}