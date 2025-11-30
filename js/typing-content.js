// js/typing-content.js
/**
 * Typing test content - available at window.typingContent
 * and helper window.getRandomTypingParagraph(language)
 *
 * Keep the text short and varied. You can expand the arrays with your own paragraphs.
 */

window.typingContent = window.typingContent || {
    english: [`Teachers play one of the most important roles in shaping the life of every student, and their influence remains with us long after we leave school. A teacher is not only someone who stands in front of the class and explains lessons, but also someone who guides, supports, motivates, and understands each student with patience and care. Teachers work tirelessly to help us gain knowledge, develop skills, and build confidence, and they do all this with dedication and sincerity, often without expecting anything in return. A good teacher is like a lamp that lights the path for students, helping them move forward with clarity and purpose. Teachers wake up early, reach school on time, and prepare their lessons with great thought, because they know that every class is a chance to shape a young mind. They speak with kindness, maintain discipline, and try their best to make learning easy and enjoyable for every student. In many situations, teachers notice our strengths even before we realize them ourselves, and they encourage us to work harder and believe in our abilities`,
        `The environment is the natural world that surrounds us, including the air we breathe, the water we drink, the land we live on, and all living things. It is essential for our survival and well-being, as it provides us with resources such as food, water, and shelter. However, human activities have led to significant environmental degradation, including pollution, deforestation, and climate change. To protect the environment, it is crucial to adopt sustainable practices such as reducing waste, conserving energy, and protecting natural habitats. By working together to care for our environment, we can ensure a healthy planet for future generations.`,
        `Education is the key to unlocking a brighter future for individuals and society as a whole. It empowers people with knowledge, skills, and values that enable them to contribute positively to their communities. Education fosters critical thinking, creativity, and problem-solving abilities, which are essential in today's rapidly changing world. Moreover, it promotes social cohesion and understanding by bringing together people from diverse backgrounds. Investing in education is not only beneficial for personal growth but also for economic development and social progress. Therefore, it is imperative that we prioritize access to quality education for all, regardless of their socio-economic status or geographical location.`],
     hindi: [
        "भारत एक विशाल देश है जिसमें विभिन्न संस्कृतियाँ और परंपराएँ हैं।",
        "शिक्षा जीवन की नींव है और यह हमें समाज में आगे बढ़ने में मदद करती है।",
        "पर्यावरण संरक्षण हम सभी की जिम्मेदारी है।"
    ],
    krutidev: [
        // KrutiDev strings can be the same unicode here for demo; in production replace with KrutiDev encoded text if necessary
        "Hkkjr ,d fo'kky ns'k gSA ;gk¡ fofHkUu laLÑfr;k¡ vkSj ijaik,a gSaA",
        "f'k{kk thou dh uhao gS vkSj gesa vkxs c<+us esa enn djrh gSA"
    ]
};

window.getRandomTypingParagraph = function(language = 'english') {
    const arr = Array.isArray(window.typingContent[language]) ? window.typingContent[language] : window.typingContent['english'];
    if (!Array.isArray(arr) || arr.length === 0) return '';
    const i = Math.floor(Math.random() * arr.length);
    return arr[i] || '';
};
