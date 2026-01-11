import { generateSecureHash } from "../services/hash.service.js";
import { env } from "../config/env.js";

export const generateHash = (req, res) => {
  try {
    const payload = req.body;

    if (!env.hashSecret) {
      return res.status(500).json({
        success: false,
        message: "Secret key not configured",
      });
    }

    const hash = generateSecureHash(payload, env.hashSecret);

    return res.status(200).json({
      success: true,
      hash,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Hash generation failed",
    });
  }
};

export const initiateSale = async (req, res) => {
  try {
    const response = await fetch(
      "https://pgpayuat.icicibank.com/tsp/pg/api/v2/initiateSale",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ICICI PG failed" });
  }
}
