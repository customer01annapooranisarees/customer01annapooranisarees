# Product review extension for customer01annapooranisarees

This extension allows customer to review and rate products.

> **Note**: This extension requires customer01annapooranisarees version 1.0.0-rc.6 or higher.

## Installation guide

### Step 1: Install the extension using npm:

```bash
npm install @customer01annapooranisarees/product_review

```

### Step 2: Enable the extension

Edit the `config/default.json` file in the root directory of your customer01annapooranisarees installation and add the following line to the `extensions` section:

```json
{
  ...,
  "system": {
    ...,
    "extensions": [
      ...,
      {
        "name": "product_review",
        "resolve": "node_modules/@customer01annapooranisarees/product_review",
        "enabled": true,
        "priority": 10
      }
    ]
  }
}
```

### Step 3: Run the build command

```bash
npm run build
```