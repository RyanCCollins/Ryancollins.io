var keystone = require('keystone');
var transform = require('model-transform');
var Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  avatar: { type: Types.CloudinaryImage },
  bio: { type: Types.Markdown, height: 150 },
  website: { type: Types.Url, note: 'Full url, including http://' },
  twitter: {
    username: { type: String, note: 'Twitter username' },
    url: { type: Types.Url, note: 'Full url, including http://' }
  },
  github: {
    username: { type: String, note: 'Twitter username' },
    url: { type: Types.Url, note: 'Full url, including http://' }
  },
  password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});

transform.toJSON(User);

User.defaultColumns = 'name, email, isAdmin';
User.register();
