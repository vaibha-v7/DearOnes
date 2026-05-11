const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.enhanceMessage = async (req, res) => {
  try {
    const { message, recipientName, occasion } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') {
      return res.status(500).json({ message: 'Gemini API key is not configured on the server.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    let prompt = '';
    
    if (!message || message.trim() === '') {
      prompt = `Write a short, beautifully poetic, and heartfelt message for a greeting card. 
        ${recipientName ? `The recipient's name is ${recipientName}. ` : ''}
        ${occasion ? `The occasion is ${occasion}. ` : ''}
        The tone should be elegant, warm, and emotional. ABSOLUTE MAXIMUM of 20 words. Do not exceed 20 words. Do NOT include quotes around the message.`;
    } else {
      prompt = `You are an expert creative writer specializing in heartfelt greeting cards. 
        Take the following draft message and enhance it to make it more poetic, emotional, and beautifully written, while keeping the original intent. 
        ${recipientName ? `The message is to ${recipientName}. ` : ''}
        ABSOLUTE MAXIMUM of 20 words. Do not exceed 20 words. Do NOT include quotes around the message.
        Draft message: "${message}"`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text().trim();

    res.status(200).json({ enhancedMessage: enhancedText });
  } catch (error) {
    console.error('AI Enhancement Error:', error);
    res.status(500).json({ message: 'Failed to enhance message using AI.' });
  }
};
