"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const axios = require("axios");

module.exports = {
  async findID(ctx) {
    const user = ctx.state.user;
    if (user) {
      const res = await strapi.query("resultcad").find({
        UserID: user.id,
        created_at_gte: new Date(date_from),
        created_at_lte: new Date(date_to),
      });
    }
  },
  async predict(ctx) {
    const { fbs, waist, age, bpsy, bpdi, tchol, hdl } = ctx.request.body;
    const user = ctx.state.user;
    const bmi = (height / 100) ** 2 / weight;
    risk_cvd = await axios.post("http://localhost:5000/predict/?target=hd", {
      fbs,
      waist,
      age,
      bpsy,
      bpdi,
      tchol,
      hdl,
    });
    if (user) {
      const id = user.id;
      const res = await strapi.query("resultcad").create({
        id,
        fbs,
        waist,
        age,
        bpsy,
        bpdi,
        tchol,
        hdl,
        risk_cvd,
      });
    }
    ctx.send(risk_cvd);
  },
};
