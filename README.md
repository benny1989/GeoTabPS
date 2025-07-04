
# Geotab Dashboard Button Add-In

## 🛠 What this does
This add-in places a custom button on the **Dashboard** of MyGeotab. When clicked, it fetches the current logged-in user's session info and sends it to your API.

## 🌐 Deploy to GitHub Pages

1. Create a GitHub repo (e.g., `GeoTabDashboardButtonAddin`)
2. Upload these files
3. Go to **Settings > Pages**
4. Set source to `main` branch and root folder `/`
5. GitHub will publish it at:
   ```
   https://<your-username>.github.io/GeoTabDashboardButtonAddin/
   ```

## ✅ Sample manifest.json for MyGeotab

```json
{
  "name": "Dashboard Button",
  "supportEmail": "support@yourdomain.com",
  "version": "1.0",
  "items": [
    {
      "page": "dashboard",
      "buttonName": { "en": "Send User Info" },
      "icon": "https://<your-username>.github.io/GeoTabDashboardButtonAddin/images/icon.svg",
      "click": "https://<your-username>.github.io/GeoTabDashboardButtonAddin/scripts/buttonScript.js"
    }
  ],
  "isSigned": false
}
```
