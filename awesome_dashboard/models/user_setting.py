from odoo import models, fields


class UserSetting(models.Model):
    _name = "user.setting"

    user_id = fields.Integer()
    dashboard = fields.Json(ondelete={})
