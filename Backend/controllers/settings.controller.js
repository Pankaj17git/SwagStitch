const Settings = require('../models/settings.model')


const createSettings = async (req, res) => {
  try {
    // check if a settings document already exists
    const existing = await Settings.findOne();
    if (existing) {
      return res.status(400).json({ message: "Settings already exist. Use PUT to update." });
    }

    // create new settings from request body
    const settings = new Settings(req.body);
    await settings.save();

    res.status(201).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET settings
const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne(); // only one settings doc
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE settings
const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings(updates);
    } else {
      Object.assign(settings, updates);
    }

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSettings, getSettings,
  updateSettings
}