
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
String rol=request.getParameter("nm1") ;
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");

con=DriverManager.getConnection("jdbc:odbc:women");
stmt=con.createStatement();

name="select * from comment where Email='"+mm1+"' ";
 
res=stmt.executeQuery(name); %>


<% while(res.next())
{ %>

<p align="center"><table border=0>
LIST
<tr><td>Email</td><td><input type="name" value="<%=res.getString(1)%>"></td></tr><br>
<tr><td>Comment</td><td><input type="name" value="<%=res.getString(2)%>"></td></tr><br>
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

</form>
<P>&nbsp;</P>
<P>&nbsp;</P>
<P>&nbsp;</P>
<P>&nbsp;</P>
<P>&nbsp;</P>
<P>&nbsp;</P>
<P>&nbsp;</P>
<P>&nbsp;</P>
<P>&nbsp;</P>
<P>&nbsp;</P></td></tr></table></td>
<td width=205 valign=top class=contentright ><table width=185 border=0 align=center cellpadding=0 cellspacing=0 >
<tr>
<td><p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>. </p></td></tr></table>
  <p>&nbsp;</p></td></tr></table></td></tr></table>
<table width=1001 border=0 align=center cellpadding=0 cellspacing=0 >
<tr>
<td class=footerbackground ><table border=0 align=center cellpadding=0 cellspacing=0 >
<tr>
<td>
</td></tr></table>
<table border=0 align=center cellpadding=0 cellspacing=0 >
<tr>
<td class=copyright style4 ><font color="#FFFFFF">Copyright &copy;Technical  Institution Support &amp;amp; Service System. All rights reserved.<br>  
  <a href="http://www.ewisoft.com/" target="_blank" class=style5 ></a></td>
</tr>
</table></td></tr></table></body></html>