const { pool } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/postgres/connection');
const { getConfig } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/getConfig');
const sgMail = require('@sendgrid/mail');
const { select } = require('@customer01annapooranisarees/postgres-query-builder');
const { contries } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/locale/countries');
const { provinces } = require('@customer01annapooranisarees/customer01annapooranisarees/src/lib/locale/provinces');
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
    const orderPlaced = getConfig('sendgrid.events.order_placed', {});

    // Check if the we need to send the email on order placed event
    if (orderPlaced.enabled === false) {
      return;
    }

    // Check if the template is set
    if (!orderPlaced.templateId) {
      return;
    }

    // Build the email data
    const orderId = data.order_id;
    const order = await select()
      .from('order')
      .where('order_id', '=', orderId)
      .load(pool);

    if (!order) {
      return;
    }

    const emailData = order;
    order.items = await select()
      .from('order_item')
      .where('order_item_order_id', '=', order.order_id)
      .execute(pool);

    emailData.shipping_address = await select()
      .from('order_address')
      .where('order_address_id', '=', order.shipping_address_id)
      .load(pool);

    emailData.shipping_address.country_name =
      contries.find((c) => c.code === emailData.shipping_address.country)
        ?.name || '';

    emailData.shipping_address.province_name =
      provinces.find((p) => p.code === emailData.shipping_address.province)
        ?.name || '';

    emailData.billing_address = await select()
      .from('order_address')
      .where('order_address_id', '=', order.billing_address_id)
      .load(pool);

    emailData.billing_address.country_name =
      contries.find((c) => c.code === emailData.billing_address.country)
        ?.name || '';

    emailData.billing_address.province_name =
      provinces.find((p) => p.code === emailData.billing_address.province)
        ?.name || '';

    const finalEmailData = await getValue(
      'sendgrid_order_confirmation_email_data',
      emailData,
      {}
    );

    // Send the email
    const msg = {
      to: order.customer_email,
      subject: orderPlaced.subject || 'Order Confirmation',
      from,
      templateId: orderPlaced.templateId,
      dynamicTemplateData: finalEmailData
    };

    await sgMail.send(msg);
  } catch (e) {
    error(e);
  }
};
