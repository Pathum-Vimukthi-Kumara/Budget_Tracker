   M S B A M L   `   `   `  ����I  EBudget Tracker, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:Budget_TrackerBudget_Tracker  5   	   #    Budget_Tracker.CalendarWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   .localclr-namespace:Budget_Tracker     5   	   
�������  � Title$  Transaction Calendar��5   	   $	��512��6&   $	��700��63    � WindowStartupLocation$ CenterScreen=�5   	   ��5	      �� 5
   
    �� 
StartPoint$	 0,0&�6    �� EndPoint$	 0,1&�6/   .��5      �  � Color$ DarkBlue��6    � Offset$	 0.0Q�6,   � 5      $ 	AliceBlue��6   $	 1.0Q�6-   5      .��5      � $��10q�6    � ColumnDefinitions 5   
   �� 5      $	��67* �6   �� 5      $
��613* �6    � RowDefinitions 5   
   �� 5      $
��Auto �6   �� 5      $��1* �6   �� 5      $��2* �6   .+�5    
   �� $��Transaction Calendar��6   $��24(�5!      
�������$
��Bold"�5#      $
��Left=�5$      $��
155,0,0,10q�5%      $��0��5&      $��1��6!   &   System.Windows.Controls.Calendar  5)   
   -   5          Name$ TransactionCalendar��5)      $	��Top=�5,      $��1��5-      $	��168��6    $��2��6-   $��2��6>   	 � 	Resources	 5.      :  4System.Windows.Controls.Primitives.CalendarDayButton
 �� 
TargetType �� Property �� Value �� 
TargetType �� RelativeSource   VisibilityConverter �� 	Converter  TransactionColorConverter��%�  '        7   7  �� 50      "
  6   .�51      ��  � �� 52      �� 53      "  6.   .R�54   "   � .+�56   &   �� $��Center=�67   $��Center=�6T   A� 58   &   $��10��6.   $��10��69   $��Center=�59   .   $��Bottom=�5:   .   y�5;   .   �� *Tag+ �� *Self+8   ��5<   .   �� *Tag+ �� *Self+8  5=   #   5>      5@      5A      5B      5C      �� 5F   
   $��2��6   $��	0,10,0,30q�6"   $��2��65   .+�5G      �� $$��Transactions on Selected Date:��6   $��16(�5H      
�������$
��Bold"�5J      $��0,10,0,5q�5K      &   System.Windows.Controls.DataGrid  5N      -   5          Name$ TransactionGrid��5N         AutoGenerateColumns$ False��5O         
IsReadOnly$
 True��5P      $	��185��5Q      $��Stretch=�5R         AlternatingRowBackground �#F5F5F5   RowBackground
 �����   SelectionUnit$ FullRow=�5V         SelectionMode$ Single=�5X         GridLinesVisibility$ 
Horizontal=�5Y      
���   �$��0q�5[      	 5^      =  7System.Windows.Controls.Primitives.DataGridColumnHeader*  $System.Windows.Controls.DataGridCell �� Triggers �� Binding �� AncestorType �� Value)  #System.Windows.Controls.DataGridRow��%�  '        '  �     '  �    �� 5_      "
  6   .�5`      ��  � ��
 ��  �67   �� 5a       � ��
 �����67   �� 5b       � ��$ 16(�65   �� 5c       � ��$
 Bold"�67   �� 5d       � ��$ 40��63   5e      �� 5g      "
  6   .�5h      ��  � ��
 �����67    5i      �� 5k       6*   �� *
IsSelected+ ��  DataGridRow True6�   .a�5l   "   ��  � �� �#D3D3D36?   5n      5p      �� 5r      "
  6    5s      �� 5u       6*   �� *
IsSelected+ ��  DataGridRow True6�   .a�5v   "   ��  � �� �#D3D3D36?   5x      5z      5{         Columns 5}      0  *System.Windows.Controls.DataGridTextColumn  5      ,  &System.Windows.Controls.DataGridColumn   Width5	  /System.Windows.Controls.DataGridLengthConverter$ 10	 6)      
IsReadOnly$
 True��64     5�         Header$ ID��6)   $	 100	 6L   1
  +System.Windows.Controls.DataGridBoundColumn  
  Binding  65   �� *Id+6L     5�      $ Title��6)   $	 100	 6R     68   �� *Title+6R     5�      $ Amount��6)   $	 100	 6T     69   �� *Amount+6T     5�      $
 Date��6)   $	 100	 6`     67   �� *Date+! �� StringFormat$! d��6`     5�      $
 Type��6)   $	 100	 6P     67   �� *Type+6P   5�      5�      5�      5�      