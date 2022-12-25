def create_names( lan='chinese' ):
    name = ''
    if lan == 'chinese':
        file = open( './src_chinese_names.txt', 'r', encoding='UTF-8' )
        names = file.read()
        file.close()

        names = names.split( '\n' )
        for i in range( len( names ) ):
            names[ i ] = "'" + names[ i ] + "'"
        names = ','.join( names )

        file = open( './chinese_names.js', 'w', encoding='UTF-8' )
        file.write( 'const chinese_names = [' )
        file.write( names )
        file.write( ']\n' )
        file.write( 'export {chinese_names}' )
        file.close()

    elif lan == 'english':
        with open( './src_english_names.txt', 'r' ) as f:
            names = f.readlines()

        for i in range( len( names ) ):
            names[ i ] = "'" + names[ i ][ :-1 ] + "'"
        names = ','.join( names )

        with open( './english_names.js', 'w' ) as f:
            f.write( 'const english_names = [' )
            f.write( names )
            f.write( ']\n' )
            f.write( 'export {english_names}' )


if __name__ == '__main__':
    create_names( 'chinese' )
    create_names( 'english' )
