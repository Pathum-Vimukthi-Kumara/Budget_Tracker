   M S B A M L   `   `   `  ����I  EBudget Tracker, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:Budget_TrackerBudget_Tracker  5   	   #    Budget_Tracker.CalendarWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   .localclr-namespace:Budget_Tracker     5   	   ���#023e8a  � Title$  Transaction Calendar��5   	   $	��512��6&   $	��700��63    � WindowStartupLocation$ CenterScreen=�5   	    � 	Resources 5	      ��%    5      .��5      � $��10q�6    � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��1* �6   �� 5      $��2* �6   .+�5   
   �� $��Transaction Calendar��6   $��24(�5      
�������$
��Bold"�5      $��Center=�5      $��0,0,0,10q�5      $��0��5      &   System.Windows.Controls.Calendar  5   
   -   5          Name$ TransactionCalendar��5      $	��Top=�5"      $��1��5#      $	��168��6    $��2��6-    5$      :  4System.Windows.Controls.Primitives.CalendarDayButton �� 
TargetType �� Property �� Value �� 
TargetType	 �� RelativeSource   VisibilityConverter
 �� 	Converter  TransactionColorConverter��%�  '        7   7  �� 5&      "  6   .�5'      ��  � �� 5(      �� 5)      "  6.   .R�5*   "   � .+�5,   &   �� $��Center=�67   $��Center=�6T   A� 5/   &   $��10��6.   $��10��69   $��Center=�50   .   $��Bottom=�51   .   y�52   .   �� *Tag+	 �� *Self+8
   ��53   .   �� *Tag+	 �� *Self+8
  54   #   55      57      58      59      5:      �� 5=   
   $��2��6   $��	0,10,0,30q�6"   .+�5>      �� $$��Transactions on Selected Date:��6   $��16(�5?      
�������$
��Bold"�5A      $��0,10,0,5q�5B      &   System.Windows.Controls.DataGrid  5E      -   5          Name$ TransactionGrid��5E         AutoGenerateColumns$ False��5F         
IsReadOnly$
 True��5G      $	��185��5H      $��Stretch=�5I         Columns 5J      0  *System.Windows.Controls.DataGridTextColumn  5K      ,  &System.Windows.Controls.DataGridColumn   Header$ ID��6)      Width5  /System.Windows.Controls.DataGridLengthConverter$ 50 6L   1  +System.Windows.Controls.DataGridBoundColumn   Binding 65   �� *Id+6L     5L      $ Title��6)   $	 150 6R    68   �� *Title+6R     5M      $ Amount��6)   $	 100 6T    69   �� *Amount+6T     5N      $
 Type��6)   $	 100 6P    67   �� *Type+6P     5O      $
 Date��6)   $	 150 6`    67   �� *Date+ �� StringFormat$ d��6`   5Q      5R      5S      5T      