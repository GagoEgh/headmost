export interface Menu {
    konstruktor: {
        konstr: string,
        frame :string ,
        magnet :string
    },
    idea: string,
    aboutUs:string,
    user: {
        save:string,
        exit: string,
        profil:string, 
        images:string, 
        orders:string, 
        close:string, 
        updateOk:string,
        noUpdate:string,
        orderOk:string,
        orderErr:string,
        myOrder: {
            description:string,
            status: string,
            add:string, 
            only:string,
            delete:string,
            no:string,
            yes:string,
        }
    }
}

export interface ImgTextValid {
    placeholder:string, 
    title: string,
    modalText1:string, 
    modalText2: string,
    createWord:string, 
    orderAdd:string, 
    modalHeader:string, 
    batnSave: string,
}

export interface Imgs {
    imgHover:string 
    deleteText:string 
    changeImage:string 
    save:string 
    batnSave:string
}

export interface  ImgMenu {
    menuTitle:string
    color:string 
    categori:string
    myPhoto: string
}

export interface Order {
    userData: {
        frstName:string 
        lastName:string 
        brtDay: string
        email: string
        phoneNumber:string 
        country:string
        countryPlaceholder:string
        addres: string
        shipping: string
        addresPost: string
        comment: string
        sale: string
        btnOrder: string
        update: string
        password: string
        logIn:string 
        register: string
        passwordReset:string
        date: string
        congratulations: string
        congratulationsTitle: string
        message: string
        sms:string
        ship:string
        saleLength:string
    },
    informImg: {
        titleH1:string
        titleH2:string
        title: string
        imgLength:string
        letterSum:string 
        price:string 
        addSum:string 
        carzin:string
    }
}

export interface IdeaImg {
    imgTitle:string 
    name: string
    imgPhone:string 
    yourName: string
    ideaMessage:string 
    navTitle:string 
    all:string 
}

export interface ErroreMessage{
    required:string 
    minlength: string
    maxLength:string 
    userNameChar:string 
    isEmail:string 
    isSize: string
    imgErr: string
    textErr:string
    getPage:string
    checkPass:string
    bigDate:string
    textErrNum:string
    titleLength:string
    noUsser:string
    emailSms:string
}

export interface About {
    hello:string  
    text_1:string 
    text_2:string 
    inet:string  
    Faq:string 
    btnQuest:string 
    kontacktInfo:string 
    questions: [
        {
            id:number,
            isBlock:boolean,
            label:string 
            answers: string
        },
    ]
}

export interface Steps{
    compile :string
    text1:string
    select:string
    text2:string
    get:string
    text3:string
    donate:string
    text4:string
}