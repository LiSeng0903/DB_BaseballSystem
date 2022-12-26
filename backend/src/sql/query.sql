SELECT
    PName
FROM
    team
    INNER JOIN player ON team.Captain = player.SID
WHERE
    TName = '富邦悍將'