SELECT
    CASE
        WHEN HomeScore > AwayScore THEN HomeTeam
        WHEN HomeScore < AwayScore THEN AwayTeam
        ELSE NULL
    END AS WinTeam
FROM
    Game