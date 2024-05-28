import axios from "axios";
import { Request, Response } from "express";

export const getBars = async (req: Request, res: Response) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          term: "bars",
          location,
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch data from Yelp API" });
  }
};
