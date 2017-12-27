import { conn } from "../../config/mysql.config";
import Sequalize, { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Faker from "faker";

const models = {
    Author: conn.import("../models/author"),
    Post: conn.import("../models/post"),
    Taxonomy: conn.import("../models/taxonomy"),
    Role: conn.import("../models/role"),
    Permission: conn.import("../models/permission"),
    Setting: conn.import("../models/settings"),
    Media: conn.import("../models/media")
};

Object.keys(models).map(name => {
    if ("associate" in models[name]) {
        models[name].associate(models);
    }
});
models.Sequalize = Sequalize;
models.conn = conn;

/*----------------------------------
[Get Permissions from Role]
*/
//  await models.Permission.findAll({
//         attributes: ["name"],
//         through: { attributes: [] },
//         include: [
//             {
//                 model: models.Role,
//                 attributes: [],
//                 as: models.Role.tableName,
//                 where: {
//                     id: 1
//                 }
//             }
//         ]
//     });

models.conn.sync({ force: true }).then(async () => {
    await insertRolePermData();
    await insertAuthor();
    await insertTaxonomy();
    await insertPost();
    await insertSettings();
});

export async function insertRolePermData() {
    let MANAGE_OWN_POSTS = await models.Permission.create({
        name: "MANAGE_OWN_POSTS"
    });
    let READ_ONLY_POSTS = await models.Permission.create({
        name: "READ_ONLY_POSTS"
    });
    let MANAGE_ALL_POSTS = await models.Permission.create({
        name: "MANAGE_ALL_POSTS"
    });
    let MANAGE_USERS = await models.Permission.create({
        name: "MANAGE_USERS"
    });
    let MANAGE_SETTINGS = await models.Permission.create({
        name: "MANAGE_USERS"
    });

    let role = await models.Role.create({ name: "ADMIN" });
    await role.addPermission(MANAGE_OWN_POSTS);
    await role.addPermission(READ_ONLY_POSTS);
    await role.addPermission(MANAGE_ALL_POSTS);
    await role.addPermission(MANAGE_USERS);
    await role.addPermission(MANAGE_SETTINGS);

    role = await models.Role.create({ name: "REVIEWER" });
    await role.addPermission(MANAGE_ALL_POSTS);

    role = await models.Role.create({ name: "READER" });
    await role.addPermission(READ_ONLY_POSTS);

    role = await models.Role.create({ name: "AUTHOR" });
    await role.addPermission(MANAGE_OWN_POSTS);
}

export async function insertAuthor() {
    await models.Author.bulkCreate([
        {
            fname: "John",
            lname: "Dave",
            email: "admin@razor.com",
            password: bcrypt.hashSync("password", 12),
            social: JSON.stringify({
                twitter: "",
                facebook: "",
                github: "",
                instagram: ""
            }),
            role_id: 1
        },
        {
            fname: "Jim",
            lname: "Parker",
            email: "author@razor.com",
            password: bcrypt.hashSync("password", 12),
            social: JSON.stringify({
                twitter: "",
                facebook: "",
                github: "",
                instagram: ""
            }),
            role_id: 1
        }
    ]);
}
export async function insertTaxonomy() {
    await models.Taxonomy.bulkCreate([
        {
            name: "Uncategorized",
            type: "post_category"
        },
        {
            name: "General",
            type: "post_category"
        }
    ]);
    await models.Taxonomy.bulkCreate([
        {
            name: "tag1",
            type: "post_tag"
        },
        {
            name: "tag2",
            type: "post_tag"
        },
        {
            name: "tag3",
            type: "post_tag"
        },
        {
            name: "tag4",
            type: "post_tag"
        },
        {
            name: "tag5",
            type: "post_tag"
        }
    ]);
}

export async function insertPost() {
    // get author
    let admin = await models.Author.findOne({ where: { role_id: 1 } });

    let post = await models.Post.create({
        title: "Welcome",
        body: Faker.lorem.paragraphs(6),
        excerpt: Faker.lorem.sentences(),
        cover_image: "http://lorempixel.com/900/300/nature/",
        type: "post",
        status: "publish",
        slug: "welcome-world",
        author_id: admin.id
    });
    await admin.addPost(post);

    let taxonomy = await models.Taxonomy.findOne({
        where: { type: "post_category" }
    });
    let postItem = await models.Post.findOne({ where: { id: 1 } });
    await postItem.addTaxonomy(taxonomy);
}

export async function insertSettings() {
    let menu = JSON.stringify([
        {
            label: "Home",
            id: 1,
            priority: 1,
            slug: "welcome-world",
            home: true,
            type: "category"
        }
    ]);
    let data = [
        {
            option: "site_title",
            value: "Paperboat"
        },
        {
            option: "site_tagline",
            value: "Minimalism is beautiful"
        },
        {
            option: "site_email",
            value: ""
        },
        {
            option: "site_description",
            value: ""
        },
        {
            option: "social_twitter",
            value: ""
        },
        {
            option: "social_facebook",
            value: ""
        },
        {
            option: "social_instagram",
            value: ""
        },
        {
            option: "sidebar_latest_post_count",
            value: 3
        },
        {
            option: "sidebar_about",
            value:
                "You can fill up this space by writing a short bio about yourself or about your site.."
        },
        {
            option: "menu",
            value: menu
        }
    ];
    await models.Setting.bulkCreate(data);
}