const {query} = require("express");

const USER =
    'Select TOP (1000) [MerchantId],[FirstName],[LastName],[PhoneNumber],' +
    '[Email],[AppUserId],[DateCreated],[PushNotificationsEnabled],' +
    '[EmailNotificationsEnabled] FROM [Merchant] WHERE MerchantId = 1';

const ACCEPTED_OFFERS =
    'SELECT TOP (1000) [AcceptedOfferId],[OfferCode],[ExpirationDateTime],' +
    '[IsRedeemed],[Business_FK],[Offer_FK],[SubCategory_FK],[Consumer_FK],' +
    '[SubCategory_FK],[Wildcard],[DirectDICKER],[InGrid],[Win],[Created],[Discount]' +
    ',[Updated] FROM [AcceptedOffer]';

const OFFERS =
    'SELECT TOP (1000) [OfferId],[Disclaimer],[TargetDiscountPct],[LowestDiscountPct]' +
    ',[HighestDiscountPct],[StartingDate],[EndingDate],[IsActive],[DateTimeCreated],' +
    '[DateTimeUpdated],[Friday],[InitialQuantity],[Monday],[QuantityRemaining],' +
    '[Saturday],[Sunday],[Thursday],[Tuesday],[Wednesday],[Business_FK],[DirectDICKER],[Wildcard],[SubCategory_FK],[InGrid] FROM [Offer]';

const SUBCATEGORIES =
    'SELECT TOP (1000) [SubCategoryId],[SubCategoryName],[Category_FK] FROM [SubCategory]';

// const SUBCATEGORIES_EXAMPLE = (id) => `SELECT TOP (1000) [${id}],[SubCategoryName],[Category_FK] FROM [SubCategory]`;

const BUSINESSES =
    'SELECT TOP (1000) [BusinessId],[BusinessName],[StreetAddress1],[StreetAddress2]' +
    ',[City],[State],[ZipCode],[BusinessPhone],[BusinessEmail],[DateTimeCreated],[DateTimeUpdated]' +
    ',[Merchant_FK],[BusinessCode],[CategoryId],[SubCategoryId] FROM [dbo].[Business]' +
    ' WHERE Merchant_FK = 1';

const REGISTER = 0;

const REGISTERNEW = 'INSERT INTO [dbo].[AspNetUsers] (UserName, PasswordHas) VALUES(?,?)';
const REGISTERNEW_OLD = 'INSERT INTO [dbo].[AspNetUsers]\n' +
    '           ([Id]\n' +
    '           ,[UserName]\n' +
    '           ,[NormalizedUserName]\n' +
    '           ,[Email]\n' +
    '           ,[NormalizedEmail]\n' +
    '           ,[EmailConfirmed]\n' +
    '           ,[PasswordHash]\n' +
    '           ,[SecurityStamp]\n' +
    '           ,[ConcurrencyStamp]\n' +
    '           ,[PhoneNumber]\n' +
    '           ,[PhoneNumberConfirmed]\n' +
    '           ,[TwoFactorEnabled]\n' +
    '           ,[LockoutEnd]\n' +
    '           ,[LockoutEnabled]\n' +
    '           ,[AccessFailedCount]\n' +
    '           ,[PushNotificationsEnabled]\n' +
    '           ,[EmailNotificationsEnabled]\n' +
    '           ,[Admin])\n' +
    '     VALUES\n' +
    '\t (\'jspinrdj1231\', \'nick@nick.gmail\',' +
    ' \'NICK@NICK.GMAIL\', \'nick@nick.gmail\', \'NICK@NICK.GMAIL\',' +
    ' \'1\', \'nickpassword\', \'jnaowjn12314\', \'erjogneojr\', \'9049049004\', 0, 0, NULL, 1, 0, 1, 1, 0)\n' +
    '\n' +
    '\n';

module.exports = {USER, ACCEPTED_OFFERS, OFFERS, SUBCATEGORIES, REGISTER, BUSINESSES, REGISTERNEW};
