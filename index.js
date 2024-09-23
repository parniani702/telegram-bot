const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('7267918336:AAHrHfMbj1kepi2NcRfSQJ-5bf1VVOt5NyQ'); // توکن ربات خود را اینجا قرار دهید




// Start Command
bot.start  ( (ctx) => {

    
    ctx.reply(`سلام ${ctx.from.first_name} 🤴\n شناسه کاربری شما : ${ctx.from.id} 🆔\n  ایدی شما : @${ctx.from.username} 💡 \n`, Markup.inlineKeyboard([
        [Markup.button.callback('قیمت ارز 💲', 'arz')],
        [Markup.button.callback('قیمت ارز های دیجیتال 🔐', 'digital')],
        [Markup.button.callback('فال حافظ 🧢', 'hafez')],
        [Markup.button.callback('جوک 🃏', 'joke')],
        
    ]))
});
// Back Action
bot.action  ('back', (ctx) => {
    ctx.editMessageText('به منوی اول برگشتیم😎', Markup.inlineKeyboard([
        [Markup.button.callback('قیمت ارز 💲', 'arz')],
        [Markup.button.callback('قیمت ارز های دیجیتال 🔐', 'digital')],
        [Markup.button.callback('فال حافظ 🧢', 'hafez')],
        [Markup.button.callback('جوک 🃏', 'joke')],
    ]))
});
// دستور ارسال جوک
bot.action('joke', async (ctx) => {
    const jokeApi = await  axios.get('https://one-api.ir/joke/?token=610732:669e956ee0803')
    const jokeText = jokeApi.data.result

    ctx.editMessageText(jokeText, Markup.inlineKeyboard([
        [Markup.button.callback('ارسال مجدد 🃏','joke')],
        [Markup.button.callback('🔙', 'back')]
    ]))
    
})
//   =/=/=>  قیمت ارز 
bot.action('arz',async (ctx) => {

    const arzApi = await axios.get('https://one-api.ir/price/?token=610732:669e956ee0803&action=tgju')
    const arzText = arzApi.data.result
    const time = arzText.currencies.dollar.ts // گرفتن تایم
    const usdPrice = arzText.currencies.dollar.p //س
    const eurPrice = arzText.currencies.eur.p
    const tryPrice = arzText.currencies.try.p
    const aedPrice = arzText.currencies.aed.p
    // gold
    const gold24Price = arzText.gold.geram24.p
    const gold18Price = arzText.gold.geram18.p
    const goldDasteDovom = arzText.gold.daste_doom.p
    const goldMesghal = arzText.gold.mesghal.p
    const goldAbShode = arzText.gold.ab_shode.p

    //coin 
    const coinEmami = arzText.coin.sekee.p
    const coinBahar = arzText.coin.sekee.p
    const coinNim = arzText.coin.nim.p
    const coinRob = arzText.coin.rob.p

    
    ctx.editMessageText(`قیمت  دلار : ${usdPrice} 🇺🇸 \n قیمت  یورو : ${eurPrice} 🇪🇺 \n قیمت  لیر ترکیه : ${tryPrice} 🇹🇷 \n قیمت  درهم امارات : ${aedPrice} 🇦🇪 \n\n\n 〰〰〰〰〰〰〰〰〰〰〰〰\n قیمت طلا 24 عیار : ${gold24Price} ⚜️ \n قیمت طلا 18 عیار : ${gold18Price} ⚜️\n قیمت طلای دست دوم : ${goldDasteDovom} 📜\n قیمت مثقال طلا : ${goldMesghal} ⚱️ \n قیمت طلای اب شده : ${goldAbShode} 🏆 \n\n\n〰〰〰〰〰〰〰〰〰〰〰〰\n  قیمت سکه امام : ${coinEmami} 🪙\n قیمت سکه بهار ازادی : ${coinBahar} 🪙 \n قیمت نیم سکه : ${coinNim}  🪙\n قیمت ربع سکه : ${coinRob} 🪙\n\n\n تمامی قیمت ها به ریال میباشد ⏳  \n   ${time} 🕰 `, Markup.inlineKeyboard([
        [Markup.button.callback('🔙', 'back')]
    ]))
})
bot.action('digital',  (ctx) => {
    
})
// =/=/=> فال حافظ
bot.action('hafez', async (ctx) => {
    const hafezApi = await axios.get('https://one-api.ir/hafez/?token=610732:669e956ee0803') 
    
    ctx.editMessageText(`${hafezApi.data.result.TITLE}\n\n ${hafezApi.data.result.RHYME}\n\n تعبیر : ${hafezApi.data.result.MEANING}`, Markup.inlineKeyboard([
        [Markup.button.callback('فال جدید 🎩', 'hafez')],
        [Markup.button.callback('🔙', 'back')],
    ]))
})

bot.launch();

console.log('Bot is running...');



