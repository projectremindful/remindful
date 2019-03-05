import React from 'react';

export default function ReminderService() {
  this.getReminder = function() {
    return new Promise(function(resolve, reject) {
      requestAnimationFrame(reminder_URL, { json: true }, (err, res, body) => {
        if (err) {
          reject(err);
        }
        resolve(res.body.reminder);
      });
    });
  };
}
