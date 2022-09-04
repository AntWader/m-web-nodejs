// 2. 

function getUserNamings(a: { name: string, surname: string }) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}