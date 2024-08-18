import { faker } from '@faker-js/faker'

const DB_SIZE = 100

export interface Job {
	jobTitle: string,
	company: string,
	salary: string,
	yearsInPosition: number,
	bizImageUrl: string,
}

export interface Person {
	firstName: string,
	lastName: string,
	userName: string,
  email: string,
  birthday: string,
	gender: string,
	bio: string,
	avatarUrl: string
	random: string[],
	job?: Job
}

export interface Product {
	productName: string,
	productDescription: string,
	price: string,
	isbn: string,
	department: string,
	imageUrl: string,
}

export function createPeopleDB(size = DB_SIZE): Person[] {
	const peopleDB: Person[] = []

	for (let i = 0; i < size; i++) {
		const sex = faker.person.sexType()
		const firstName = faker.person.firstName(sex)
		const lastName = faker.person.lastName(sex)
    const email = faker.internet.email({firstName: firstName, lastName: lastName, allowSpecialCharacters: true})
    const birthday = faker.date.birthdate({min: 18, max: 50, mode: 'age'}).toDateString()
		const randomNumber = parseInt(faker.string.numeric(1))
		const random = Array.from(Array(randomNumber)).map(() => faker.animal.fish())
    const uniqueRandom = new Set(random)

    let job: Job | undefined = undefined
    if (faker.datatype.boolean()) {
      job = {
        jobTitle: faker.person.jobTitle(),
        company: faker.company.name(),
        salary: faker.finance.amount({ min: 30000, max: 1000000, dec: 2, symbol: '$' }),
        yearsInPosition: faker.number.int({ min: 1, max: 10 }),
        bizImageUrl: faker.image.urlLoremFlickr({ category: 'business' }),
      } as Job
    }

		const person = {
			firstName,
			lastName,
			userName: faker.internet.userName({ firstName, lastName }),
      email,
      birthday,
			gender: sex,
			bio: faker.person.bio(),
			avatarUrl: faker.image.avatar(),
			random: Array.from(uniqueRandom),
			job,
		} as Person
		peopleDB.push(person)
	}
	return peopleDB
}

export function createProductDB(size = DB_SIZE): Product[] {
	const productDB: Product[] = []
	for (let i = 0; i < size; i++) {
		const product = {
			productName: faker.commerce.productName(),
			productDescription: faker.commerce.productDescription(),
			price: faker.commerce.price({ min: 100, max: 1000, dec: 2, symbol: '$' }),
			isbn: faker.commerce.isbn(),
			department: faker.commerce.department(),
			imageUrl: faker.image.urlLoremFlickr({ category: 'product' }),
		} as Product
		productDB.push(product)
	}
	return productDB
}
