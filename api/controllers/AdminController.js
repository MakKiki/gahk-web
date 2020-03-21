/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    return res.view('admin/index');
  },

  news_list: async function (req, res) {
    var models = await News.find({ sort: 'category' });
    return res.view('admin/news/index', { news: models });
  },

  news_create: async function (req, res) {

    if (req.method === 'GET') {
      return res.view('admin/news/detail', { news: {} });
    }

    if (!req.body.News) return res.badRequest();

    req.body.News.startDate = new Date(req.body.News.startDate);
    req.body.News.endDate = new Date(req.body.News.endDate);

    return res.json(await News.create(req.body.News).fetch())
  },

  news_detail: async function (req, res) {
    //    var models = await News.find({sort:'create_at DESC'});

    var id = req.params.id || '';

    if (req.method === 'GET') {
      return res.view('admin/news/detail', { news: await News.findOne(id) });
    }

    if (!req.body.News) return res.badRequest();

    req.body.News.startDate = new Date(req.body.News.startDate);
    req.body.News.endDate = new Date(req.body.News.endDate);

    return res.json(await News.update(id).set(req.body.News).fetch());
  },

  news_delete: async function (req, res) {
    return res.json(await News.destroy(req.params.id).fetch());
  },

  email_list: async function (req, res) {
    return res.view('admin/email/index', { emails: await Email.find() });
  },

  email_detail: async function (req, res) {
    return res.json(await Email.update(req.params.id).set(req.body.Email).fetch());
  },

  user_list: async function (req, res) {
    return res.view('admin/user/index', { news: await User.find({ sort: 'create_at DESC' }) });
  },

  user_detail: async function (req, res) {

  },

  //applyHandle
  apply_search: async function (req, res) {

    // if (req.method == "GET")
    //   return res.view('admin/applyHandle/search');

    var condition = {};
    var form = req.query.application;

    if (req.query.application == "TRGA") {
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;

      var models = await TRGCompetition.find({
        where: condition
      });
    } else if (req.query.application == "TSRGA") {
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;

      var models = await TSRGCompetition.find({
        where: condition
      });
    } else if (req.query.application == "GRGS"){
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;

      var models = await GRGS.find({
        where: condition
      });
    }else if (req.query.application == "GRGP"){
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;

      var models = await GRGP.find({
        where: condition
      });
    }else if (req.query.application == "trampoline"){
      if (req.query.gender) condition.gender = req.query.gender;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;

      var models = await Trampoline.find({
        where: condition
      });
    }else if (req.query.application == "gfa"){
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;

      var models = await GFA.find({
        where: condition
      });
    }else if (req.query.application == "acroage"){
      if (req.query.item) condition.item = req.query.item;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;

      var models = await Acroage.find({
        where: condition
      });
    }


    return res.view('admin/applyHandle/search', { applications: models, form });


  },



};

