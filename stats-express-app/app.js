const express = require('express');
const app = express();

function mean(nums) {
  let total = 0;
  for (let num of nums) {
    total += Number(num);
  }
  return total / nums.length;
}

app.get('/mean', (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  let nums = req.query.nums.split(',');

  // check if all nums are actually numbers
  for (let num of nums) {
    if (isNaN(num)) {
      return res.status(400).json({ error: `${num} is not a number` });
    }
  }

  let value = mean(nums);
  res.json({ operation: 'mean', value: value });
});

function median(nums) {
  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);

  if (nums.length % 2 === 0) {
    // even number of elements
    return (nums[middleIndex - 1] + nums[middleIndex]) / 2;
  } else {
    // odd number of elements
    return nums[middleIndex];
  }
}

app.get('/median', (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  let nums = req.query.nums.split(',').map(Number);

  // check if all nums are actually numbers
  for (let num of nums) {
    if (isNaN(num)) {
      return res.status(400).json({ error: `${num} is not a number` });
    }
  }

  let value = median(nums);
  res.json({ operation: 'median', value: value });
});

function mode(nums) {
  let freqCounter = {};

  for (let num of nums) {
    freqCounter[num] = (freqCounter[num] || 0) + 1;
  }

  let maxFrequency = 0;
  let modes = [];

  for (let num in freqCounter) {
    if (freqCounter[num] > maxFrequency) {
      maxFrequency = freqCounter[num];
      modes = [num];
    } else if (freqCounter[num] === maxFrequency) {
      modes.push(num);
    }
  }

  return modes;
}

app.get('/mode', (req, res) => {
  if (!req.query.nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  let nums = req.query.nums.split(',').map(Number);

  // check if all nums are actually numbers
  for (let num of nums) {
    if (isNaN(num)) {
      return res.status(400).json({ error: `${num} is not a number` });
    }
  }

  let value = mode(nums);
  res.json({ operation: 'mode', value: value });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server
