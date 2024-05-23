const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // No date parameter, use current date
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // Parameter is a number, parse it as a timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Try to parse parameter as a date string
    date = new Date(dateParam);
  }

  if (isNaN(date.getTime())) {
    // Date is invalid
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON with unix and utc keys
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});