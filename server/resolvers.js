// In-memory data store mimicking the external countries API
const continents = [
    { code: 'AF', name: 'Africa' },
    { code: 'AN', name: 'Antarctica' },
    { code: 'AS', name: 'Asia' },
    { code: 'EU', name: 'Europe' },
    { code: 'NA', name: 'North America' },
    { code: 'OC', name: 'Oceania' },
    { code: 'SA', name: 'South America' }
];

const languages = [
    { code: 'en', name: 'English', native: 'English', rtl: false },
    { code: 'es', name: 'Spanish', native: 'Español', rtl: false },
    { code: 'fr', name: 'French', native: 'Français', rtl: false },
    { code: 'de', name: 'German', native: 'Deutsch', rtl: false },
    { code: 'pt', name: 'Portuguese', native: 'Português', rtl: false },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', rtl: false },
    { code: 'ja', name: 'Japanese', native: '日本語', rtl: false },
    { code: 'zh', name: 'Chinese', native: '中文', rtl: false },
    { code: 'ar', name: 'Arabic', native: 'العربية', rtl: true },
    { code: 'ru', name: 'Russian', native: 'Русский', rtl: false }
];

const countries = [
    {
        code: 'AD',
        name: 'Andorra',
        native: 'Andorra',
        phone: '376',
        continentCode: 'EU',
        capital: 'Andorra la Vella',
        currency: 'EUR',
        languageCodes: ['ca'],
        emoji: '🇦🇩',
        emojiU: 'U+1F1E6 U+1F1E9',
        states: []
    },
    {
        code: 'AE',
        name: 'United Arab Emirates',
        native: 'دولة الإمارات العربية المتحدة',
        phone: '971',
        continentCode: 'AS',
        capital: 'Abu Dhabi',
        currency: 'AED',
        languageCodes: ['ar'],
        emoji: '🇦🇪',
        emojiU: 'U+1F1E6 U+1F1EA',
        states: []
    },
    {
        code: 'AF',
        name: 'Afghanistan',
        native: 'افغانستان',
        phone: '93',
        continentCode: 'AS',
        capital: 'Kabul',
        currency: 'AFN',
        languageCodes: ['ps', 'uz', 'tk'],
        emoji: '🇦🇫',
        emojiU: 'U+1F1E6 U+1F1EB',
        states: []
    },
    {
        code: 'AU',
        name: 'Australia',
        native: 'Australia',
        phone: '61',
        continentCode: 'OC',
        capital: 'Canberra',
        currency: 'AUD',
        languageCodes: ['en'],
        emoji: '🇦🇺',
        emojiU: 'U+1F1E6 U+1F1FA',
        states: [
            { code: 'NSW', name: 'New South Wales' },
            { code: 'QLD', name: 'Queensland' },
            { code: 'SA', name: 'South Australia' },
            { code: 'TAS', name: 'Tasmania' },
            { code: 'VIC', name: 'Victoria' },
            { code: 'WA', name: 'Western Australia' }
        ]
    },
    {
        code: 'BR',
        name: 'Brazil',
        native: 'Brasil',
        phone: '55',
        continentCode: 'SA',
        capital: 'Brasília',
        currency: 'BRL',
        languageCodes: ['pt'],
        emoji: '🇧🇷',
        emojiU: 'U+1F1E7 U+1F1F7',
        states: [
            { code: 'SP', name: 'São Paulo' },
            { code: 'RJ', name: 'Rio de Janeiro' },
            { code: 'MG', name: 'Minas Gerais' },
            { code: 'BA', name: 'Bahia' },
            { code: 'PR', name: 'Paraná' }
        ]
    },
    {
        code: 'CA',
        name: 'Canada',
        native: 'Canada',
        phone: '1',
        continentCode: 'NA',
        capital: 'Ottawa',
        currency: 'CAD',
        languageCodes: ['en', 'fr'],
        emoji: '🇨🇦',
        emojiU: 'U+1F1E8 U+1F1E6',
        states: [
            { code: 'AB', name: 'Alberta' },
            { code: 'BC', name: 'British Columbia' },
            { code: 'MB', name: 'Manitoba' },
            { code: 'NB', name: 'New Brunswick' },
            { code: 'ON', name: 'Ontario' },
            { code: 'QC', name: 'Quebec' }
        ]
    },
    {
        code: 'CN',
        name: 'China',
        native: '中国',
        phone: '86',
        continentCode: 'AS',
        capital: 'Beijing',
        currency: 'CNY',
        languageCodes: ['zh'],
        emoji: '🇨🇳',
        emojiU: 'U+1F1E8 U+1F1F3',
        states: [
            { code: 'BJ', name: 'Beijing' },
            { code: 'SH', name: 'Shanghai' },
            { code: 'GD', name: 'Guangdong' },
            { code: 'ZJ', name: 'Zhejiang' }
        ]
    },
    {
        code: 'DE',
        name: 'Germany',
        native: 'Deutschland',
        phone: '49',
        continentCode: 'EU',
        capital: 'Berlin',
        currency: 'EUR',
        languageCodes: ['de'],
        emoji: '🇩🇪',
        emojiU: 'U+1F1E9 U+1F1EA',
        states: [
            { code: 'BW', name: 'Baden-Württemberg' },
            { code: 'BY', name: 'Bavaria' },
            { code: 'BE', name: 'Berlin' },
            { code: 'HH', name: 'Hamburg' }
        ]
    },
    {
        code: 'FR',
        name: 'France',
        native: 'France',
        phone: '33',
        continentCode: 'EU',
        capital: 'Paris',
        currency: 'EUR',
        languageCodes: ['fr'],
        emoji: '🇫🇷',
        emojiU: 'U+1F1EB U+1F1F7',
        states: []
    },
    {
        code: 'GB',
        name: 'United Kingdom',
        native: 'United Kingdom',
        phone: '44',
        continentCode: 'EU',
        capital: 'London',
        currency: 'GBP',
        languageCodes: ['en'],
        emoji: '🇬🇧',
        emojiU: 'U+1F1EC U+1F1E7',
        states: [
            { code: 'ENG', name: 'England' },
            { code: 'SCT', name: 'Scotland' },
            { code: 'WLS', name: 'Wales' },
            { code: 'NIR', name: 'Northern Ireland' }
        ]
    },
    {
        code: 'IN',
        name: 'India',
        native: 'भारत',
        phone: '91',
        continentCode: 'AS',
        capital: 'New Delhi',
        currency: 'INR',
        languageCodes: ['hi', 'en'],
        emoji: '🇮🇳',
        emojiU: 'U+1F1EE U+1F1F3',
        states: [
            { code: 'MH', name: 'Maharashtra' },
            { code: 'DL', name: 'Delhi' },
            { code: 'KA', name: 'Karnataka' },
            { code: 'TN', name: 'Tamil Nadu' },
            { code: 'UP', name: 'Uttar Pradesh' }
        ]
    },
    {
        code: 'JP',
        name: 'Japan',
        native: '日本',
        phone: '81',
        continentCode: 'AS',
        capital: 'Tokyo',
        currency: 'JPY',
        languageCodes: ['ja'],
        emoji: '🇯🇵',
        emojiU: 'U+1F1EF U+1F1F5',
        states: [
            { code: 'TO', name: 'Tokyo' },
            { code: 'OS', name: 'Osaka' },
            { code: 'KY', name: 'Kyoto' },
            { code: 'YO', name: 'Yokohama' }
        ]
    },
    {
        code: 'MX',
        name: 'Mexico',
        native: 'México',
        phone: '52',
        continentCode: 'NA',
        capital: 'Mexico City',
        currency: 'MXN',
        languageCodes: ['es'],
        emoji: '🇲🇽',
        emojiU: 'U+1F1F2 U+1F1FD',
        states: [
            { code: 'DF', name: 'Mexico City' },
            { code: 'JAL', name: 'Jalisco' },
            { code: 'NL', name: 'Nuevo León' }
        ]
    },
    {
        code: 'RU',
        name: 'Russia',
        native: 'Россия',
        phone: '7',
        continentCode: 'EU',
        capital: 'Moscow',
        currency: 'RUB',
        languageCodes: ['ru'],
        emoji: '🇷🇺',
        emojiU: 'U+1F1F7 U+1F1FA',
        states: []
    },
    {
        code: 'US',
        name: 'United States',
        native: 'United States',
        phone: '1',
        continentCode: 'NA',
        capital: 'Washington D.C.',
        currency: 'USD',
        languageCodes: ['en'],
        emoji: '🇺🇸',
        emojiU: 'U+1F1FA U+1F1F8',
        states: [
            { code: 'CA', name: 'California' },
            { code: 'NY', name: 'New York' },
            { code: 'TX', name: 'Texas' },
            { code: 'FL', name: 'Florida' },
            { code: 'IL', name: 'Illinois' }
        ]
    }
];

const resolvers = {
    Query: {
        countries: () => countries,
        country: (parent, { code }) => countries.find(country => country.code === code),
        continents: () => continents,
        continent: (parent, { code }) => continents.find(continent => continent.code === code),
        languages: () => languages,
        language: (parent, { code }) => languages.find(language => language.code === code)
    },

    Country: {
        continent: (country) => continents.find(continent => continent.code === country.continentCode),
        languages: (country) =>
            languages.filter(language => country.languageCodes.includes(language.code)),
        states: (country) => country.states.map(state => ({ ...state, country }))
    },

    Continent: {
        countries: (continent) => countries.filter(country => country.continentCode === continent.code)
    },

    State: {
        country: (state) => state.country
    }
};

module.exports = { resolvers };
