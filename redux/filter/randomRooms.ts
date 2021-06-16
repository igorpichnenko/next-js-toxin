
const images = ['https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-eight.jpg?alt=media&token=acd396ed-bb80-4a1e-bb05-fcd0e6201361',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-eleven.jpg?alt=media&token=7d1c9f51-4ba4-4893-9de2-9258cc7af6d0',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-five.jpg?alt=media&token=61383edf-7684-446d-b3f6-ca32cf65c589',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-four.jpg?alt=media&token=8292662a-d247-4f7b-abf4-7790d99e721f',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-nine.jpg?alt=media&token=dac5d11a-c938-42a4-9e10-15879359a3f8',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-one.jpg?alt=media&token=67cfcdc4-c770-4e56-a69b-a7c0adea2410',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-seven.jpg?alt=media&token=e8a31994-744d-4274-a6a0-da5f6b44a927',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-six.jpg?alt=media&token=618153a4-3cfa-47da-a59c-395d3841edb0',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-ten.jpg?alt=media&token=bebe23ae-f916-4b97-b3ad-0202175704eb',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-three.jpg?alt=media&token=1b437ae0-4737-41fb-aa10-651ff9e9b178',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-twelve.jpg?alt=media&token=c0d8bf22-ec24-4b5a-b77a-aa718ef0f73d',
    'https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/rooms%2Froom-image-two.jpg?alt=media&token=a2cf7671-5417-4692-adda-7cbbea902833']

const rules = [{ id: 3, text: "Без вечеринок и мероприятий" }, { id: 2, text: "Нельзя с питомцами" }, { id: 1, text: "Нельзя курить" }]


const randomRooms = () => {

    const randomBabies = Math.floor(Math.random() * 5)
    const randomCollection = Math.floor(Math.random() * 500) + 200
    const randomDiscount = Math.floor(Math.random() * 200) + 200
    const randomGuest = Math.floor(Math.random() * 11)
    const randomId = Math.floor(Math.random() * 5467) + 578
    const randomOne = Math.floor(Math.random() * 11)
    const randomTwo = Math.floor(Math.random() * 11)
    const randomTree = Math.floor(Math.random() * 11)
    const randomFour = Math.floor(Math.random() * 11)
    const randomIsBreakfast = Math.random() >= 0.5;
    const randomIsCanSmoke = Math.random() >= 0.5;
    const randomIsCrib = Math.random() >= 0.5;
    const randomIsDesk = Math.random() >= 0.5;
    const randomIsFeedingChair = Math.random() >= 0.5;
    const randomIsGuestsPossible = Math.random() >= 0.5;
    const randomIsHelper = Math.random() >= 0.5;
    const randomIsLuxury = Math.random() >= 0.5;
    const randomIsPetsAllowed = Math.random() >= 0.5;
    const randomIsShampoo = Math.random() >= 0.5;
    const randomIsTelevision = Math.random() >= 0.5;
    const randomIsWideCorridor = Math.random() >= 0.5;
    const randomIsComfort = Math.random() >= 0.5;
    const randomIsCosiness = Math.random() >= 0.5;
    const randomIsConvenience = Math.random() >= 0.5;
    const randomNumberBathrooms = Math.floor(Math.random() * 6)
    const randomNumberBed = Math.floor(Math.random() * 6)
    const randomNumberBedrooms = Math.floor(Math.random() * 6)
    const randomNumberOfReviews = Math.floor(Math.random() * 234) + 3
    const randomNumberOfStars = Math.floor(Math.random() * 6)
    const randomPrice = Math.floor(Math.random() * 13001) + 2000
    const randomOk = Math.floor(Math.random() * 65) + 20
    const randomExcellent = Math.floor(Math.random() * 140) + 20
    const randomGood = Math.floor(Math.random() * 170) + 40
    const randomPloor = Math.floor(Math.random() * 20)

    const isRules = []
    if (!randomIsGuestsPossible) {
        isRules.push(rules[0])
    }
    if (!randomIsPetsAllowed) {
        isRules.push(rules[1])
    }
    if (!randomIsCanSmoke) {
        isRules.push(rules[2])
    }

    const room = {
        babies: randomBabies,
        bookingDates: [],
        collection: randomCollection,
        discount: randomDiscount,
        guests: randomGuest,
        id: randomId,
        images: [images[randomOne], images[randomTwo], images[randomTree], images[randomFour]],
        impressionsAboutTheRoom: [{ name: "ok", value: randomOk }, { name: "excellent", value: randomExcellent }, { name: "good", value: randomGood }, { name: "poor", value: randomPloor }],
        isBreakfast: randomIsBreakfast,
        isCanSmoke: randomIsCanSmoke,
        isCrib: randomIsCrib,
        isDesk: randomIsDesk,
        isFeedingChair: randomIsFeedingChair,
        isGuestsPossible: randomIsGuestsPossible,
        isHelper: randomIsHelper,
        isLuxury: randomIsLuxury,
        isPetsAllowed: randomIsPetsAllowed,
        isShampoo: randomIsShampoo,
        isTelevision: randomIsTelevision,
        isWideCorridor: randomIsWideCorridor,
        number: String(randomId),
        numberBathrooms: randomNumberBathrooms,
        numberBed: randomNumberBed,
        numberBedrooms: randomNumberBedrooms,
        numberOfReviews: randomNumberOfReviews,
        numberOfStars: randomNumberOfStars,
        price: randomPrice,
        reviews: [{
            date: "2021-05-12",
            image: "https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/avatars%2Fuserpick-murad-sarafanov.png?alt=media&token=b89afa07-f884-4337-8d9c-a5b8e136a3a7",
            like: { active: true, amount: 12 },
            msg: "Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.",
            name: "Мурад Сарафанов",
            userId: 1
        }, {
            date: "2021-05-10",
            image: "https://firebasestorage.googleapis.com/v0/b/heroku-229f8.appspot.com/o/avatars%2Fuserpic-patrasia-steklishkova.png?alt=media&token=c674c834-95d0-4fcc-b72c-7284284c7fd4",
            like: {
                active: false,
                amount: 3
            },
            msg: "Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать, каждый день новое блюдо и десерт как комплимент",
            name: "Патрисия Стёклышкова",
            userId: 2
        }],
        roomDetails: { isComfort: randomIsComfort, isCosiness: randomIsCosiness, isConvenience: randomIsConvenience },
        rules: isRules

    }

    return room
}



export default randomRooms