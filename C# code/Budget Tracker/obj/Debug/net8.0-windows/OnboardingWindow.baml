   M S B A M L   `   `   `  ����  Budget Tracker%    Budget_Tracker.OnboardingWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	     � Title$  Welcome to Budget Tracker��5   	   $	��512��5   	   $	��900��5   	   .��5	      �  � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $��* �6   .+�5   
   �� ���#023e8a$��40��5      $	��Top=�5       �� CornerRadius$ 5��5      $��0��5      ._�5      �  � ColumnDefinitions 5      �� 5      $
��Auto �6'   �� 5      $��* �6'   �� 5      $
��Auto �6'   �� 5      $
��Auto �6'   �� 5      $
��Auto �6'   .+�5"      �� $��Budget Tracker��5#      $��24(�5$      $
��Bold"�5%      
�������$��Center=�5'      $
��Left=�5(      $��10,0,0,0q�5)      $��0��5*      5.      5/      � 52   
   $��1��6    53      �� 54      $
��695* �6#   �� 55      $	��86* �6#   �� 56      $
��119* �6#   ��5:      �� 5<       j� Stretch$ UniformToFill=�5=       �� ImageSource$ /Images/background.jpg��65   .+�5?      �� ���#F0F0F0$ 10��5A       �� Padding$ 20q�5B       J� Opacity$	 0.9Q�5C      $
��Left=�5D      $��Center=�5E      $��50,0,0,0q�5F      $	��400��5G      $	��258��6   ._�5I      �� .+�5K      �� $%��Welcome to Your Budget Tracker!��5L      $��28(�5M      $
��Bold"�5N      ���#0000A0$��0,0,0,10q�5P      $
��Wrap=�5Q      �� 5T      $����Get an overview of your finances at a glance—track budgets, view transactions, and see easy-to-read graphs to stay in control.��5U      $��14(�5V      
���   �$
��Wrap=�5X      $��0,0,0,20q�5Y      �� 5\      -   5        $��Get Started��5]      
����  �
�������$��16(�5`      $
��10,5q�5a      $
��Left=�5b      ��5d      �� 5e       �� 
TargetType" ��6$   .�5f   "   �� 	 �� Property	 � ��
 �� Value

 ��  �6?   �� 5g   "   	 � ��

 �   �6?   �� 5h   "   	 � ��$
 16(�6=   �� 5i   "   	 � ��$

 10,5q�6<   �� 5j   "   	 � ��$

 Left=�6H    �� Triggers 5k   "   P� 5m   &    P� Property �@J�IsMouseOver P� Value$
 True��6E   . �5n   *   �� 	 � ��

 ��  �6G   �� 5o   *   	 � ��

 �����6G   5p   '   5r      5t      5v      5w      5x      5y      5z      