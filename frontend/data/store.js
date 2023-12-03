// import { v4 as makeID } from "react-uuid";

const computeRating = (reviews) => {
    let total = 0;
    reviews.map((review) => {
        total += parseInt(review.rating);
    });
    return total / reviews.length;
};

export const store = [
    {
        storeID: 1,
        name: "Jollibee",
        type: ["Burger", "Rice Meal", "Chicken", "Dessert"],
        description:
            "Jollibee is a Filipino multinational chain of fast food restaurants owned by Jollibee Foods Corporation (JFC). As of April 2018, JFC had a total of about 1,200 Jollibee outlets worldwide. with presence in Southeast Asia, the Middle East, East Asia (Hong Kong, Macau), North America, and Europe (Italy, UK).",
        price: "1",
        rating: "2",
        location:
            "855 Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F06b65abc-ca54-11e8-8d0b-a6539b949662?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1",
    },
    {
        storeID: 2,
        name: "Bacsilog",
        type: ["Rice Meal"],
        description:
            "Bacsilog is a Filipino dish composed of bagoong (fermented fish), fried rice, and fried egg. The name is a portmanteau of the words bagoong, sinangag (fried rice), and itlog (egg).",
        price: "1",
        rating: "3",
        location:
            "123 Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://www.aneking.com/wp-content/uploads/2019/09/ate-ricas-bacsilog.jpg",
    },
    {
        storeID: 3,
        name: "Mang Inasal",
        type: ["Rice Meal"],
        description:
            "Bacsilog is a Filipino dish composed of bagoong (fermented fish), fried rice, and fried egg. The name is a portmanteau of the words bagoong, sinangag (fried rice), and itlog (egg).",
        price: "1",
        rating: "5",
        location:
            "Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://www.rappler.com/tachyon/r3-assets/DC4365F676CF40C897A3FA4D152560D8/img/AC48A83B1857442E97237C402F916349/0_Night_3-scaled.jpg",
    },
    {
        storeID: 4,
        name: "Chowking",
        type: ["Rice Meal"],
        description:
            "Bacsilog is a Filipino dish composed of bagoong (fermented fish), fried rice, and fried egg. The name is a portmanteau of the words bagoong, sinangag (fried rice), and itlog (egg).",
        price: "2",
        rating: "4",
        location:
            "855 Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://quickmenu.ph/wp-content/uploads/2023/06/chowking-branch.webp",
    },
    {
        storeID: 5,
        name: "24 Chicken",
        type: ["Rice Meal"],
        description:
            "Bacsilog is a Filipino dish composed of bagoong (fermented fish), fried rice, and fried egg. The name is a portmanteau of the words bagoong, sinangag (fried rice), and itlog (egg).",
        price: "3",
        rating: "2",
        location:
            "855 Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://karlaniiinz.com/wp-content/uploads/2019/08/WaterMark_2019-08-27-19-43-44.jpeg",
    },
    {
        storeID: 6,
        name: "Jollibee",
        type: ["Burger", "Rice Meal", "Chicken", "Dessert"],
        description:
            "Jollibee is a Filipino multinational chain of fast food restaurants owned by Jollibee Foods Corporation (JFC). As of April 2018, JFC had a total of about 1,200 Jollibee outlets worldwide. with presence in Southeast Asia, the Middle East, East Asia (Hong Kong, Macau), North America, and Europe (Italy, UK).",
        price: "1",
        rating: "2",
        location:
            "855 Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F06b65abc-ca54-11e8-8d0b-a6539b949662?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1",
    },
    {
        storeID: 7,
        name: "Bacsilog",
        type: ["Rice Meal"],
        description:
            "Bacsilog is a Filipino dish composed of bagoong (fermented fish), fried rice, and fried egg. The name is a portmanteau of the words bagoong, sinangag (fried rice), and itlog (egg).",
        price: "1",
        rating: "3",
        location:
            "123 Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://www.aneking.com/wp-content/uploads/2019/09/ate-ricas-bacsilog.jpg",
    },
    {
        storeID: 8,
        name: "Mang Inasal",
        type: ["Rice Meal"],
        description:
            "Bacsilog is a Filipino dish composed of bagoong (fermented fish), fried rice, and fried egg. The name is a portmanteau of the words bagoong, sinangag (fried rice), and itlog (egg).",
        price: "1",
        rating: "5",
        location:
            "Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://www.rappler.com/tachyon/r3-assets/DC4365F676CF40C897A3FA4D152560D8/img/AC48A83B1857442E97237C402F916349/0_Night_3-scaled.jpg",
    },
    {
        storeID: 9,
        name: "Chowking",
        type: ["Rice Meal"],
        description:
            "Bacsilog is a Filipino dish composed of bagoong (fermented fish), fried rice, and fried egg. The name is a portmanteau of the words bagoong, sinangag (fried rice), and itlog (egg).",
        price: "2",
        rating: "4",
        location:
            "855 Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://quickmenu.ph/wp-content/uploads/2023/06/chowking-branch.webp",
    },
    {
        storeID: 10,
        name: "24 Chicken",
        type: ["Rice Meal"],
        description:
            "Bacsilog is a Filipino dish composed of bagoong (fermented fish), fried rice, and fried egg. The name is a portmanteau of the words bagoong, sinangag (fried rice), and itlog (egg).",
        price: "3",
        rating: "2",
        location:
            "855 Taft Avenue, cor Ocampo St, Malate, Manila City, Metro Manila",
        status: "Open",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W5-pj7JlTsCs_2LJlX44Sm2czrm6C3uHOh8R8gAkGA&s",
        image: "https://karlaniiinz.com/wp-content/uploads/2019/08/WaterMark_2019-08-27-19-43-44.jpeg",
    },
];

export const reviews = [
    {
        reviewID: 1,
        userID: 1,
        storeID: 1,
        name: "Ceejay Pascasio",
        username: "ceejaypascasio",
        rating: "3",
        title: "this is the best!",
        comment:
            "This restaurant exceeded my expectations. The menu is diverse, and the flavors are exquisite. The staff is attentive and made our evening special. I can't wait to return.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",
        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",

        response: [
            {
                name: "Tony Tan Caktiong",
                title: "this is the best!",
                comment:
                    "The food here is good, no doubt about it. However, the service was a bit slow during my visit. It's a decent place for a relaxed meal.",
                icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/Tony_Tan_Caktiong_%26_Aquino_2016_%28cropped%29.jpg",
            },
        ],
    },
    {
        reviewID: 2,
        userID: 2,
        storeID: 1,
        name: "Minette Armada",
        username: "minettearmada",
        rating: "2",
        title: "Good food",
        comment:
            "I stumbled upon this place, and it's a hidden gem. The food is flavorful, and the prices are reasonable. I'll definitely be back to try more dishes.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
    {
        reviewID: 3,
        userID: 4,
        storeID: 1,
        name: "Mezen Lababidi",
        username: "mezenlababidi",
        title: "Good food",
        rating: "3",
        comment:
            "I brought my family here, and we all enjoyed our meal. There are options for everyone, including kids. The staff was accommodating, and it's a family-friendly place.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
    {
        reviewID: 4,
        userID: 3,
        storeID: 1,
        name: "Shannyne Lualhati",
        username: "shannynelualhati",
        title: "Good food",
        rating: "2",
        comment:
            "My partner and I had the most wonderful date night here. The candlelit atmosphere, the delectable dishes, and the wine selection made it a perfect evening. Highly recommended for couples.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
    {
        reviewID: 5,
        userID: 5,
        storeID: 1,
        name: "JM Maristela",
        username: "jmmaristela",
        title: "Good food",
        rating: "1",
        comment:
            "My experiences here have been a bit hit or miss. Sometimes the food is outstanding, and other times it's just okay. I'll return but hope for more consistency.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },

    {
        reviewID: 6,
        userID: 1,
        storeID: 2,
        name: "Ceejay Pascasio",
        username: "ceejaypascasio",
        title: "Good food",
        rating: "3",
        comment:
            "I had a wonderful time dining at this place. The food was delicious, the service was top-notch, and the ambiance was cozy. I highly recommend it.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
    {
        reviewID: 7,
        userID: 2,
        storeID: 2,
        name: "Minette Armada",
        username: "minettearmada",
        title: "Good food",
        rating: "2",
        comment:
            "The service was exceptional. The staff went above and beyond to make our dining experience special. It's not just about the food; it's about the overall experience.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
    {
        reviewID: 8,
        userID: 4,
        storeID: 2,
        name: "Mezen Lababidi",
        username: "mezenlababidi",
        title: "Good food",
        rating: "3",
        comment:
            "You get great value for your money here. The portion sizes are generous, and the quality of food justifies the price. I'll recommend it to friends.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
    {
        reviewID: 9,
        userID: 3,
        storeID: 2,
        name: "Shannyne Lualhati",
        username: "shannynelualhati",
        title: "Good food",
        rating: "2",
        comment:
            "Save room for dessert! Their desserts are to die for. I couldn't resist ordering seconds. The meal was fantastic from start to finish.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
    {
        reviewID: 10,
        userID: 5,
        storeID: 2,
        name: "JM Maristela",
        username: "jmmaristela",
        title: "Good food",
        rating: "1",
        comment:
            "The food was decent, but I wasn't particularly blown away. It's a decent place to eat, but it didn't leave a lasting impression.",
        image: [
            "https://fastly.4sqi.net/img/general/600x600/93732829_V_IcK5evmuXSoSa4iSYzZzhVgsf84aUUXH5Qr-hmSY8.jpg",
        ],
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
    {
        reviewID: 11,
        userID: 3,
        storeID: 2,
        name: "Shannyne Lualhati",
        username: "shannynelualhati",
        title: "Good food",
        rating: "2",
        comment:
            "This place serves up some seriously delicious comfort food. The flavors remind me of home-cooked meals, and it's the perfect spot to satisfy those cravings.",
        date: "2021-03-20",

        icon: "https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-6/245089781_4660131960693167_1477675678247855988_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=AFwmqIw1180AX-V23nj&_nc_ht=scontent.fmnl30-2.fna&oh=00_AfCh6vMphkAgXrG08SEMg7n_4FVJximv6D3RFgC6REMJlQ&oe=65340234",
    },
];
