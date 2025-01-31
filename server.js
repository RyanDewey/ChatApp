import express from 'express';
import ollama from 'ollama';
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await ollama.chat({
      model: 'deepseek-r1:1.5b',
      messages: [{ role: "user", content: message }]
    });
    
    console.log("Ollama response:", response.message.content);

    res.json({ response: response.message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'AI response failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});