// Import necessary modules
var express = require("express");
var router = express.Router();
const azureIdentity = require("@azure/identity");
const appConfig = require("@azure/app-configuration");

// Azure App Configuration settings
const endpoint = process.env.AZURE_APP_CONFIG_ENDPOINT;
const credential = new azureIdentity.DefaultAzureCredential();
const client = new appConfig.AppConfigurationClient(endpoint, credential);

// Define route for setting and getting configuration
router.get("/config", async function (req, res, next) {
  try {
    // Set configuration setting
    await client.setConfigurationSetting({
      key: "testkey",
      value: "testvalue",
      label: "optional-label",
    });

    // Get configuration setting
    const retrievedSetting = await client.getConfigurationSetting({
      key: "testkey",
      label: "optional-label",
    });

    // Send the retrieved value as response
    res.json({ retrievedValue: retrievedSetting.value });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ error: error });
  }
});

// Default route
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
