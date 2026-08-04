import express from 'express';
import openai from '../config/openai.js';

const router = express.Router();
router.post('/improve-cv', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Thiếu nội dung "content"' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Bạn là chuyên gia tuyển dụng, giúp cải thiện nội dung CV cho chuyên nghiệp và ấn tượng hơn.'
        },
        {
          role: 'user',
          content: `Hãy cải thiện đoạn CV sau:\n\n${content}`
        }
      ],
      temperature: 0.7
    });

    const result = completion.choices[0].message.content;

    res.json({ result });
  } catch (err) {
    console.error('Lỗi gọi OpenAI:', err.message);
    res.status(500).json({ error: 'Có lỗi khi gọi OpenAI API', detail: err.message });
  }
});

export default router;