// @TODO
var famine = require('../famine'),
    Reader = famine.Reader,
    MonadReader = famine.MonadReader

// calculateContentLen :: Reader String Int
// calculateContentLen = do
//     content <- ask
//     return (length content);

// -- Calls calculateContentLen after adding a prefix to the Reader content.
// calculateModifiedContentLen :: Reader String Int
// calculateModifiedContentLen = local ("Prefix " ++) calculateContentLen

// main = do
//     let s = "12345";
//     let modifiedLen = runReader calculateModifiedContentLen s
//     let len = runReader calculateContentLen s
//     putStrLn $ "Modified 's' length: " ++ (show modifiedLen)
//     putStrLn $ "Original 's' length: " ++ (show len)