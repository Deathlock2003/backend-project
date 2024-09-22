export default function handler(req, res) {
    if (req.method === 'POST') {
      // Extract the JSON data from the POST request
      const { data, full_name, dob, email, roll_number } = req.body;
  
      // Filter numbers and alphabets from the data array
      const numbers = data.filter(item => !isNaN(item));
      const alphabets = data.filter(item => isNaN(item));
      const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
      const highestLowercaseAlphabet = lowercaseAlphabets.length
        ? [lowercaseAlphabets.sort().pop()]
        : [];
  
      // Response object for POST request
      const response = {
        is_success: true,
        user_id: `${full_name}_${dob}`,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: false, // You can add logic for file validation if needed
      };
  
      // Send back the response as JSON
      res.status(200).json(response);
    } else if (req.method === 'GET') {
      // Response for GET request (operation_code)
      res.status(200).json({ operation_code: 1 });
    } else {
      // Handle unsupported methods
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  