SELECT
    *,
    YEAR(GameDate) AS year,
    MONTH(GameDate) AS 'month',
    DAY(GameDate) AS 'day'
FROM
    Game
WHERE
    HomeTeam = '富邦悍將'
    OR AwayTeam = '富邦悍將'
ORDER BY
    GameDate