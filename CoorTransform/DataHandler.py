import pymysql
import CoorTransform

conn = pymysql.connect(host='10.60.45.22',port= 3306,user = 'Leppard',passwd='123456',db='officebuilding')

cursor = conn.cursor()

cursor.execute('select a.longitude_bd, a.latitude_bd from buildings_with_rent a');

rawArr = cursor.fetchall()

for index in range(0, len(rawArr)):
    tuple = rawArr[index]
    t_tuple = CoorTransform.bd09_to_wgs84(float(tuple[0]), float(tuple[1]))
    statement = 'update buildings_with_rent a set a.longitude_wgs = {}, a.latitude_wgs = {} where a.id = {}'.format(t_tuple[0], t_tuple[1], index+1)
    cursor.execute(statement);

conn.commit()

cursor.close()
conn.close()