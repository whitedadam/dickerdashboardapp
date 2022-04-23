const USERS =
  'Select [Id],[MerchantId],[UserName],[PhoneNumber],' +
  '[Email],[PushNotificationsEnabled],' +
  '[EmailNotificationsEnabled],[LockoutEnabled] FROM [AspNetUsers2]';

const ACCEPTED_OFFERS =
    'SELECT [AcceptedOfferId],[OfferCode],[ExpirationDateTime],' +
    '[IsRedeemed],[Business_FK],[Offer_FK],[SubCategory_FK],[Consumer_FK],' +
    '[SubCategory_FK],[Wildcard],[DirectDICKER],[InGrid],[Win],[Created],[Discount]' +
    ',[Updated] FROM [AcceptedOffer]';

const OFFERS =
    'SELECT [OfferId],[Disclaimer],[TargetDiscountPct],[LowestDiscountPct]' +
    ',[HighestDiscountPct],[StartingDate],[EndingDate],[IsActive],[DateTimeCreated],' +
    '[DateTimeUpdated],[Friday],[InitialQuantity],[Monday],[QuantityRemaining],' +
    '[Saturday],[Sunday],[Thursday],[Tuesday],[Wednesday],[Business_FK],[DirectDICKER],[Wildcard],[SubCategory_FK],[InGrid] FROM [Offer]';

const SUBCATEGORIES =
    'SELECT [SubCategoryId],[SubCategoryName],[Category_FK] FROM [SubCategory]';

// const SUBCATEGORIES_EXAMPLE = (id) => `SELECT TOP (1000) [${id}],[SubCategoryName],[Category_FK] FROM [SubCategory]`;

const BUSINESSES =
    'SELECT [BusinessId],[BusinessName],[StreetAddress1],[StreetAddress2]' +
    ',[City],[State],[ZipCode],[BusinessPhone],[BusinessEmail],[DateTimeCreated],[DateTimeUpdated]' +
    ',[Merchant_FK],[BusinessCode],[CategoryId],[SubCategoryId] FROM [dbo].[Business]';

const REGISTER = 0;

const REGISTERNEW = 'INSERT INTO [dbo].[AspNetUsers] (UserName, PasswordHas) VALUES(?,?)';

module.exports = {USERS, ACCEPTED_OFFERS, OFFERS, SUBCATEGORIES, REGISTER, BUSINESSES, REGISTERNEW};
