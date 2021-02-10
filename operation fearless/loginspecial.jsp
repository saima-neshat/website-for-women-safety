<%@page language="java"%>
<%@page import="java.sql.*"%>
<html>
<head>
</head>
<body>
<%
Connection con=null;
Statement stmt=null;
ResultSet res=null;
String name;
try
{
String id=request.getParameter("nm") ;
String password=request.getParameter("pwd");

Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");

con=DriverManager.getConnection("jdbc:odbc:women");
stmt=con.createStatement();

name="select * from special where username='"+id+"' and password='"+password+"'";
 
res=stmt.executeQuery(name);
if(res.next())
{
session.setAttribute("id",id);
%>
<jsp:forward page="/special team.html"/>
<%
}
else
{
%>
<jsp:forward page="/false.html"/>
<%
}
}
catch(Exception s)
{
out.println(s);
}
%>
</body>
</html>