'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const axios = require("axios");

module.exports = {
    async predict(ctx){
        const { fbs, waist, age, bpsy, tchol, hdl, weight, height } = ctx.request.body;
        const user = ctx.user.state;
        const bmi = (height/100)**2 / weight;
        risk_cvd = await axios.post(
            'http://192.168.1.76:5000/predict/?target=hd',{
            fbs,
            bmi,
            waist,
            age,
            bpsy,
            tchol,
            hdl,
          });
        const res = await strapi.query('resultcad').create({
            fbs,
            bmi,
            waist,
            age,
            bpsy,
            tchol,
            hdl,
            weight,
            height,
            risk_cvd,
        });
        ctx.send(res);
    }
};
