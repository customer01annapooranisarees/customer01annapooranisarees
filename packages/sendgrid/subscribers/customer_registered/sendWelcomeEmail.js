const { pool } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');
const sgMail = require('@sendgrid/mail');
const { select } = require('@customer01annapooranisarees/postgres-query-builder');
const { error } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/log/logger');
const { getEnv } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getEnv');
const { getValue } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/registry');

module.exports = async function sendOrderConfirmationEmail(data) {
  try {
    // Check if the API key is set
    const apiKey = getEnv('SENDGRID_API_KEY', '');
    const from = getConfig('sendgrid.from', '');

    if (!apiKey || !from) {
      return;
    }
    sgMail.setApiKey(apiKey);
    const customerRegistered = getConfig(
      'sendgrid.events.customer_registered',
      {}
    );

    // Check if the we need to send the email on order placed event
    if (customerRegistered.enabled === false) {
      return;
    }

    // Check if the template is set
    if (!customerRegistered.templateId) {
      return;
    }

    // Build the email data
    const customerId = data.customer_id;
    const customer = await select()
      .from('customer')
      .where('customer_id', '=', customerId)
      .load(pool);

    if (!customer) {
      return;
    }

    // Remove the password
    delete customer.password;

    const emailDataFinal = await getValue(
      'sendgrid_customer_welcome_email_data',
      customer,
      {}
    );
    // Send the email
    const msg = {
      to: emailDataFinal.email,
      subject: customerRegistered.subject || `Welcome to customer01annapooranisarees`,
      from,
      templateId: customerRegistered.templateId,
      dynamicTemplateData: {
        ...emailDataFinal,
        home_url: getConfig('shop.homeUrl', '')
      }
    };

    await sgMail.send(msg);
  } catch (e) {
    error(e);
  }
};
