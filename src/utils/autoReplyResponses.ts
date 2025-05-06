export const welcomeResponses = [
  "Hello! I'm Charles, your Almost Intelligent assistant, here to help you create your link hub account.",
  "To get started, please enter your email or simply log in with your Google account using the button below.",
];

export const emailResponses = {
  firstMessage: [
    "Could you drop your email here so we can get your LinkHub started?",
    "What’s your email? I’ll keep it safe — promise!",
    "Let’s secure your space. Enter your email to begin.",
    "Just need your email to get things rolling!",
    "Start by entering your email address — quick and easy!",
  ],
  validationError: [
    "Hmm... that doesn’t look like a real email. Mind checking it?",
    "Try entering a valid email (like name@example.com).",
    "Oops! That email seems off. Give it another go?",
  ],
  validationSuccess: [
    "Awesome! Email looks good — let’s move on.",
    "Great, got your email! What’s next?",
    "Perfect! Your email is saved. Let’s keep going.",
  ],
};

export const nameResponses = {
  firstMessage: [
    "What should I call you? 😊",
    "And your name is...? Let’s make this personal.",
    "Got your email! Now, tell me your name.",
    "I’d love to know your name — it helps me greet you properly!",
    "Almost there! What name should we use for your profile?",
  ],
  validationError: [
    "That doesn’t look like a name. Try using only letters, no numbers or symbols.",
    "Hmm, names shouldn’t have numbers or special characters — try again?",
    "Let’s keep it simple. Letters only, please!",
  ],
  validationSuccess: [
    "Thanks, {name}! Nice to meet you 😊",
    "Perfect! I’ll call you {name} from now on.",
    "Awesome, {name}! Let’s move to the final step.",
  ],
};

export const usernameResponses = {
  firstMessage: [
    "Last step! Pick a cool username for your LinkHub.",
    "Now choose a username — it’ll be your unique link!",
    "What username would you like people to visit your page with?",
    "Let’s set your username — the public one your followers will see.",
    "Almost done! Just need a username and you're all set.",
  ],
  validationError: [
    "Hmm, that username looks off. Try using only letters — no spaces or symbols.",
    "Make sure it’s simple and clean — something like '{validUsername}' would work great!",
    "Your username will be used in your personal link (like linkhub.com/{validUsername}), so keep it short and unique!",
    "Let’s pick a username that’s easy to remember — no special characters, just letters.",
    "This name becomes your link! For example: linkhub.com/{validUsername} — try something like that!",
  ],
  validationSuccess: [
    "Nice choice! Your username is set 🎉",
    "All done! You’re ready to explore your new LinkHub!",
    "Username saved — your LinkHub is now live!",
  ],
};

export const questionRedirectResponses = [
  "I'm here just to help you build your perfect link hub!",
  "Let’s stay focused on setting up your profile, okay?",
  "Great question! But I can only help with your link setup right now.",
  "I'll leave that for another time, let’s finish your profile first!",
  "Haha, I wish I knew! But right now, let’s focus on you.",
  "Interesting, but I'm not programmed for that. Let's get your LinkHub ready!",
  "I bet that's a good question, but my thing is helping with links!",
  "I'll have to skip that one. Let's customize your page instead!",
];

export const vagueInputResponses = [
  "Got it, but I’ll need a more specific answer to help you better!",
  "Hmm, that doesn't help much. Could you choose one of the options?",
  "Let’s try to keep it clear and simple, ready?",
  "That was a bit too vague. Let’s try again with something I can use!",
  "I didn't catch that, could you rephrase or pick an option?",
];

export const inappropriateInputResponses = [
  "I'm just here to help, let’s keep it friendly.",
  "Let’s stay on track! Your link hub deserves it.",
  "I think we got off topic! Want to continue the setup?",
  "I’m here to support you, let’s keep things respectful.",
  "That didn’t feel great. How about we keep going with the profile?",
];

export const questionKeywords = ["?", "who", "what", "when", "where", "why", "how"];

export const inappropriateWords = ["stupid", "idiot", "dumb", "shut up", "fuck", "shit"];
