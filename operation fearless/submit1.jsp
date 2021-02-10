 <html>
<body bgcolor=cream>




<%@page language="java"%>
<%@page import="java.sql.*"%>
 
	
 <body>
<%
Connection con=null;
Statement stmt=null;
ResultSet res=null;
String name;
try
{
String Email=request.getParameter("nm1") ;

Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");

con=DriverManager.getConnection("jdbc:odbc:women");
stmt=con.createStatement();

name="select * from comment ";
 
res=stmt.executeQuery(name); %>


<% while(res.next())
{ %>

<p align="center"><table border=0>
LIST
<tr><td>Email:-</td><td><%=res.getString (1)%>"</td></tr><br>
<tr><td>Comment:-</td><td><%=res.getString (2)%>"</td></tr><br>
</table>
</tr></p><hr>
<%
}
}
catch(ClassNotFoundException e)
{

}
%>

 </table></center>



</body>
</html>


       